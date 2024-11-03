import Image from 'next/image';
import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">

      {currentPage > 1 && (
        <button 
          className="w-10 h-10 flex items-center text-center justify-center rounded-full text-gray-700 hover:bg-gray-200"
          onClick={handlePreviousPage}
        >
          <Image
            src="/file.svg"
            height={30}
            width={30}
            alt='fleche'
          />
        </button>
      )}

      
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <span
          key={page}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full border ${
            page === currentPage
              ? 'border-indigo-950 text-black-600 font-semibold'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </span>
      ))}

      
      {currentPage < totalPages && (
        <button 
          className="w-10 h-10 flex items-center text-center justify-center rounded-full text-gray-700 hover:bg-gray-200"
          onClick={handleNextPage}
        >
          <Image
            src="/fleche.svg"
            height={30}
            width={30}
            alt='fleche'
          />
        </button>
      )}
    </div>
  );
};

export default Pagination;
