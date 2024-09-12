import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagination = ({ coursesPerPage, totalCourses, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="javascript:void(0);" className="page-link text-primary bg-warning">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
