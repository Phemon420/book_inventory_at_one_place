import { useState } from "react";
import { AddBookReview } from "../utils/api";

function AddReviewPopup({ setShowModal,BookId }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  BookId: string; }) {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async () => {
      if (!comment || rating === 0) {
        alert("Please fill comment and rating!");
        return;
      }
  
      try {
        setLoading(true);
        // Add your API call logic here to submit the review
        AddBookReview(BookId, rating, comment);
        alert("Review Added!");
        setShowModal(false);
        setComment("");
        setRating(0);
      } catch (error) {
        console.error(error);
        alert("Failed to add review!");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        {/* Modal Content */}
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] relative">
            <h2 className="text-2xl font-bold mb-4">Add Your Review</h2>
  
            {/* Comment Box */}
            <textarea
              className="border w-full p-3 rounded-md mb-4"
              rows={4}
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
  
            {/* Rating Stars */}
            <div className="flex space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)}>
                  <span className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}>
                    ★
                  </span>
                </button>
              ))}
            </div>
  
            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)} // Close modal
                className="px-4 py-2 rounded-md border border-gray-400 text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
  
            {/* Close Button (Top right) */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-black"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default AddReviewPopup;