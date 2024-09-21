import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Component/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderMenu } from '../Component/Menu';
import Footer from '../Component/Footer';
import '../Resource/Css/tuan-all.css';
import { Link } from "react-router-dom";

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


            <div className="grid-body">
                <div className="body-show">
                    <div className="sreach-by-name">
                        <div className="sreach-categories box-sreach">
                            <p className="name_sreach">Language</p>
                            <div className="check-categories">
                                <input type="checkbox"></input>
                                <span>All Languege</span>
                            </div>
                            <div className="check-categories">
                                <input type="checkbox"></input>
                                <span>JavaScrip</span>
                            </div>
                            <div className="check-categories">
                                <input type="checkbox"></input>
                                <span>PHP</span>
                            </div>
                            <div className="check-categories">
                                <input type="checkbox"></input>
                                <span>Reactjs</span>
                            </div>
                            <div className="check-categories">
                                <input type="checkbox"></input>
                                <span>Python</span>
                            </div>
                            <button type="submit" className="button_seach-categories">Show more +</button>
                        </div>

                        <div className="sreach-categories box-sreach">
                            <p className="name_sreach">Price</p>
                            <div className="check-categories">
                                <input type="checkbox"></input>
                                <span>All Price</span>
                            </div>
                            <div className="check-categories">
                                <input type="checkbox"></input>
                                <span>Free</span>
                            </div>
                            <div className="check-categories">
                                <input type="checkbox"></input>
                                <span>Paid</span>
                            </div>
                            <button type="submit" className="button_seach-categories">Show more +</button>
                        </div>

                        
                    </div>
                   <div className='course-body_container'>
                   <div className="course-container">
                        <div className="course-list" id="course-list">
                            <div className="row">
                                {currentCourses.map((course) => (
                                    <div key={course.id} className="col-md-4 mb-4 col-course">
                                        <div className='body_col-md4'>
                                        <img src='/viet-img/404-error.jpg'/>
                                        <h2 class="course-title">{course.title}</h2>
                                        <p class="course-teacher"><span>Buy</span>{course.teacher}</p>
                                        <p class="course-price">{course.price} $</p>
                                        <p class="course-desc">{course.description}</p>
                                        {/* <a href="course_detail.html" class="course-btn_show-detail">See details</a> */}
                                        <Link to='/courseDetail'  class="course-btn_show-detail">See details</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                                                       
                        </div>
                        
                    </div>
                    <Pagination 
                                coursesPerPage={coursesPerPage} 
                                totalCourses={courses.length} 
                                paginate={paginate} 
                                className="btn-pages"
                            /> 
                   </div>
                    
                    
                </div>
                
            </div>


            <Footer />

        </>
    );
};

export default CourseList;
