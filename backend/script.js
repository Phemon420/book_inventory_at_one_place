import fs from 'fs';
import csv from 'csv-parser';
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://omsrivastava3466:sZsVZqEjisZ6bDsp@cluster0.uzxlz7y.mongodb.net/books?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function importBooks() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('books');
    const collection = db.collection('Book');
    
    const books = [];
    
    // Parse the CSV file
    await new Promise((resolve, reject) => {
      fs.createReadStream('./public/books.csv') // Update with your actual file path
        .on('error', (error) => {
          console.error(`Error reading file: ${error.message}`);
          reject(error);
        })
        .pipe(csv())
        .on('data', (row) => {
          const book = {
            isbn13:         row['isbn13']?.trim(),
            isbn10:         row['isbn10']?.trim(),
            title:          row['title']?.trim(),
            subtitle:       row['subtitle']?.trim() || '',
            authors:        row['authors']?.trim(),
            categories:     row['categories']?.trim(),
            published_year: row['published_year']?.trim(),
            thumbnail:      row['thumbnail']?.trim(),
            description:    row['description']?.trim(),
            average_rating: parseFloat(row['average_rating']) || 0
          };

          books.push(book);
        })
        .on('end', () => {
          console.log(`Finished parsing ${books.length} books from CSV`);
          resolve();
        });
    });
    
    // Now insert the books after CSV parsing is complete
    console.log(`Attempting to import ${books.length} books`);
    const result = await collection.insertMany(books);
    console.log(`✅ Imported ${result.insertedCount} books successfully`);
    
    return result;
  } catch (err) {
    console.error('❌ Error:', err);
    throw err;
  } finally {
    // Close the connection after all operations are complete
    await client.close();
    console.log('MongoDB connection closed');
  }
}

importBooks()
  .then(() => console.log('Import process completed'))
  .catch(console.error);