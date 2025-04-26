import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBookReviews } from '../utils/api';
import AddReviewPopup from '../components/reviewpopup';

const BookDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const book = state?.book;
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviewData = await fetchBookReviews(id);
        setReviews(reviewData.bookReviews || []); // ✅ only set array
      } catch (error) {
        console.error('Failed to load reviews:', error);
      } finally {
        setLoadingReviews(false);
      }
    };
    loadReviews();
  }, [id]);
  

  if (!book) return <div className="p-8 text-center">Book data not available</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Book Main Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {book.thumbnail && (
          <img src={book.thumbnail} alt={book.title} className="w-48 h-64 object-cover rounded-lg" />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          {book.subtitle && <p className="italic text-gray-600 mb-2">{book.subtitle}</p>}
          <p className="text-gray-700 mb-2">Authors: {book.authors}</p>
          <p className="text-gray-700 mb-2">Published: {book.published_year}</p>
          <p className="text-gray-700 mb-2">ISBN: {book.isbn13}</p>
          {book.categories && <p className="text-blue-600 mb-2">{book.categories}</p>}
          {book.average_rating && <p className="text-yellow-600 mb-2">★ {book.average_rating.toFixed(1)}</p>}
          <p className="mt-4 text-gray-600">{book.description}</p>
        </div>
      </div>
        
      {/* Button to trigger modal */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Add Review
      </button>

      {/* Pass the `showModal` state and `setShowModal` to AddReviewPopup */}
      {showModal && <AddReviewPopup setShowModal={setShowModal} BookId={book.id}/>}


      {/* Reviews Section */}
      {loadingReviews ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet for this book.</p>
      ) : (
        <div className="space-y-6 mt-8">
          {reviews.map((review) => (
            <div key={review.id} className="p-6 bg-white rounded-lg shadow-md">
              {/* Author Name */}
              <p className="text-lg font-semibold text-gray-800">{review.user?.name}</p>
          
              {/* Rating */}
              <div className="flex items-center mt-2 mb-4">
                <span className="text-yellow-500 text-xl">{'⭐'.repeat(review.rating)}</span>
                <span className="ml-2 text-sm text-gray-500">({review.rating}/5)</span>
              </div>
          
              {/* Comment */}
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}


    </div>
  );
};

export default BookDetails;
