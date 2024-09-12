import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Component/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderMenu } from '../Component/Menu';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(5);

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem('token');

            // if (!token) {
            //     alert("Please login to view the courses.");
            //     return;
            // }

            try {
                const response = await axios.get('http://localhost:8080/api/course');
                setCourses(response.data.result);
            } catch (error) {
                console.error('Error fetching courses', error);
                alert('Failed to load courses');
            }
        };

        fetchCourses();
    }, [currentPage]);

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <HeaderMenu />
            <div className="container mt-5">
                <h1 className="text-center mb-4 text-primary">Danh sách khóa học</h1>
                <div className="row">
                    {currentCourses.map((course) => (
                        <div key={course.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{course.title}</h5>
                                    <p className="card-text">{course.description}</p>
                                    <p className="card-text"><strong>Giá: </strong>${course.price}</p>
                                    <p className="card-text"><strong>Đánh giá: </strong>{course.rate}</p>
                                    <button className="btn btn-warning text-white">Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination 
                    coursesPerPage={coursesPerPage} 
                    totalCourses={courses.length} 
                    paginate={paginate} 
                />
            </div>
        </>
    );
};

export default CourseList;
