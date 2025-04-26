"use client"

import type { Book } from "../types/book"
import type { JSX } from "react"

interface BookPreviewProps {
  book: Book | null
  onClose: () => void
}

const BookPreview = ({ book, onClose }: BookPreviewProps): JSX.Element | null => {
  if (!book) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start p-6 border-b">
          <h2 className="text-2xl font-bold text-deepblue-950">{book.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close preview">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <img
              src={book.cover || "/placeholder.svg"}
              alt={`Cover of ${book.title}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <div className="mt-4 flex items-center">
              <span className="text-deepblue-500 mr-1">★</span>
              <span className="text-deepblue-800">{book.rating}/5</span>
              <span className="ml-4 bg-deepblue-100 text-deepblue-800 text-sm px-2 py-1 rounded">{book.genre}</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-deepblue-800 mb-2">About this book</h3>
            <p className="text-gray-700 mb-4">
              {book.description ||
                "No description available for this book. This is a placeholder text that would normally contain a summary of the book's content, themes, and other relevant information to help readers decide if they want to read it."}
            </p>

            <div className="mb-4">
              <h4 className="font-semibold text-deepblue-800">Author</h4>
              <p className="text-gray-700">{book.author}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-deepblue-800">Publication Details</h4>
              <p className="text-gray-700">
                Publisher: {book.publisher || "Unknown"}
                <br />
                Published: {book.publishedDate || "Unknown"}
                <br />
                Pages: {book.pages || "Unknown"}
                <br />
                Language: {book.language || "English"}
              </p>
            </div>

            <div className="mt-6">
              <a
                href="/books"
                className="bg-deepblue-950 hover:bg-deepblue-800 text-white px-4 py-2 rounded-md font-medium inline-flex items-center"
              >
                View Full Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookPreview
