import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, setCurrentPage } from '../redux/slice/postSlice';
import { useNavigate } from 'react-router-dom';

const PostList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentItems, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  // Generate array of page numbers for pagination
  const pageNumbers = [];
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    pageNumbers.push(i);
  }

  if (loading && currentItems.length === 0) {
    return <div className="flex items-center justify-center p-8 text-lg font-medium text-gray-600">Loading books...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600 bg-red-100 rounded-md">Error: {error}</div>;
  }

  const handleBookClick = (book) => {
    console.log(book);
    navigate(`/books/${book.id}`, { state: { book } }); 
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Collection</h1>
      <div className="text-sm text-gray-600 mb-4">
        <p>Showing page {currentPage} of {totalPages}</p>
      </div>
      
      {loading && <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-md shadow-lg">Refreshing...</div>
      </div>}
      
      {currentItems.length === 0 && !loading ? (
        <div className="text-center py-12 text-gray-500">No books found</div>
      ) : (
        
         
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((book) => (
            <div key={book.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col">
               <div 
            key={book.id} 
            onClick={() => handleBookClick(book)} 
            className="cursor-pointer border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col"
          >
              {book.thumbnail && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={book.thumbnail} 
                    alt={`Cover of ${book.title}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4 flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 line-clamp-2">{book.title}</h2>
                {book.subtitle && <p className="text-sm text-gray-600 mb-2 italic">{book.subtitle}</p>}
                <p className="text-sm text-gray-700 mb-2">By {book.authors}</p>
                <div className="flex flex-wrap gap-2 mb-3 text-xs">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-700">{book.published_year}</span>
                  {book.categories && (
                    <span className="px-2 py-1 bg-blue-100 rounded-full text-blue-700">{book.categories}</span>
                  )}
                  {book.average_rating && (
                    <span className="px-2 py-1 bg-yellow-100 rounded-full text-yellow-700">★ {book.average_rating.toFixed(1)}</span>
                  )}
                </div>
                {book.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {book.description.length > 150 
                      ? `${book.description.substring(0, 150)}...` 
                      : book.description}
                  </p>
                )}
                <div className="mt-auto pt-2 border-t border-gray-100">
                  <small className="text-xs text-gray-500">ISBN13: {book.isbn13}</small>
                </div>
              </div>
            </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded text-sm ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded text-sm ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          >
            Previous
          </button>
          
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 rounded text-sm ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            >
              {number}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded text-sm ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded text-sm ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;