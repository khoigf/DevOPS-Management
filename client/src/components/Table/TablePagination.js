import React from 'react';
import '../../assets/styles/TablePagination.css';

const TablePagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="table-pagination">
            <button
                className="pagination-btn"
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="pagination-info">
                Page {currentPage} of {totalPages}
            </span>
            <button
                className="pagination-btn"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default TablePagination;
