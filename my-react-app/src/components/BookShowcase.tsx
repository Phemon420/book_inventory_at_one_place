"use client"

import { useState } from "react"
import BookPreview from "./BookPreview"
import type { Book } from "../types/book"

const BookShowcase = (): JSX.Element => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const books: Book[] = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "/images/book1.png",
      genre: "Classic",
      rating: 4.5,
      publisher: "Scribner",
      publishedDate: "1925",
      pages: 180,
      language: "English",
      description:
        "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "/images/book2.png",
      genre: "Fiction",
      rating: 4.8,
      publisher: "J. B. Lippincott & Co.",
      publishedDate: "1960",
      pages: 281,
      language: "English",
      description:
        "The story takes place during three years of the Great Depression in the fictional town of Maycomb, Alabama. It focuses on six-year-old Scout Finch, who lives with her older brother Jem and their widowed father Atticus, a middle-aged lawyer.",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      cover: "/images/book3.png",
      genre: "Dystopian",
      rating: 4.6,
      publisher: "Secker & Warburg",
      publishedDate: "1949",
      pages: 328,
      language: "English",
      description:
        "The novel is set in Airstrip One, formerly Great Britain, a province of the superstate Oceania, whose residents are victims of perpetual war, omnipresent government surveillance, and public manipulation.",
    },
    {
      id: 4,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      cover: "/images/book4.png",
      genre: "Fantasy",
      rating: 4.7,
      publisher: "George Allen & Unwin",
      publishedDate: "1937",
      pages: 310,
      language: "English",
      description:
        "The story is about the hobbit Bilbo Baggins, who is hired by the wizard Gandalf as a burglar, along with a group of dwarves, to accompany them on a quest to reclaim the Lonely Mountain from the dragon Smaug.",
    },
    {
      id: 5,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "/images/book5.png",
      genre: "Romance",
      rating: 4.4,
      publisher: "T. Egerton, Whitehall",
      publishedDate: "1813",
      pages: 432,
      language: "English",
      description:
        "The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
    },
    {
      id: 6,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      cover: "/images/book6.png",
      genre: "Coming-of-age",
      rating: 4.2,
      publisher: "Little, Brown and Company",
      publishedDate: "1951",
      pages: 277,
      language: "English",
      description:
        "The novel details two days in the life of 16-year-old Holden Caulfield after he has been expelled from prep school. Confused and disillusioned, Holden searches for truth and rails against the 'phoniness' of the adult world.",
    },
  ]

  const openPreview = (book: Book): void => {
    setSelectedBook(book)
  }

  const closePreview = (): void => {
    setSelectedBook(null)
  }

  return (
    <section id="books" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-deepblue-950 mb-4">Explore Popular Books</h2>
          <p className="text-lg text-deepblue-700 max-w-3xl mx-auto">
            Browse through some of the most beloved titles in our database. Track these and thousands more in your
            personal collection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={book.cover || "/placeholder.svg"}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-deepblue-950">{book.title}</h3>
                  <span className="bg-deepblue-100 text-deepblue-800 text-sm px-2 py-1 rounded">{book.genre}</span>
                </div>
                <p className="text-deepblue-700 mb-4">by {book.author}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-deepblue-500 mr-1">★</span>
                    <span className="text-deepblue-800">{book.rating}/5</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openPreview(book)}
                      className="text-deepblue-600 hover:text-deepblue-800 font-medium"
                    >
                      Preview
                    </button>
                    <button className="text-deepblue-600 hover:text-deepblue-800 font-medium">Add to Collection</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/books"
            className="bg-deepblue-950 hover:bg-deepblue-800 text-white px-8 py-4 rounded-md font-medium text-lg inline-flex items-center"
          >
            View All Books
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>

      {selectedBook && <BookPreview book={selectedBook} onClose={closePreview} />}
    </section>
  )
}

export default BookShowcase
