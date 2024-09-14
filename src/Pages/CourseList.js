import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Component/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderMenu } from '../Component/Menu';
import '../Resource/Css/tuan-all.css';

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
            <div className="heaeder">
                <div className="menu">
                    <a className="link_menu" href="home.html">Home</a>
                    <a className="link_menu" href="course.html">Course</a>
                    <input type="text" value="" placeholder="Sreach content"/>
                    <a className="button-function" href="#"><i className="fa-solid fa-cart-shopping icon-function"></i></a>
                    <a className="button-function" href="#"><i className="fa-solid fa-bell icon-function"></i></a>
                    <button className="button_header">Logn In</button>
                    <button className="button_header button-signIn">Sign In</button>
                </div>
            </div>


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
                    
                    <div className="course-container">
                        <div className="course-list" id="course-list">
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
                    </div>
                    
                </div>
                
            </div>



            <footer>
                <div className="body-footer">
                    <div className="grid-body">
                        <div className="show_body-footer">
                            <div className="col">
                                <p className="value">We provide scientific training to help you supplement necessary knowledge and skills to improve your skills.</p>
                                <p className="value">8a Ton That Thuyet, My Dinh, Ha Noi</p>
                                <p className="value">0123 456 789</p>
                            </div>
                            <div className="col">
                                <p className="name-value">Useful Links</p>
                                <hr className="bd-botton"></hr>
                                <div className="value-col">
                                    <p className="value"><a href="">Our values</a></p>
                                    <p className="value"><a href="">Our advisory board</a></p>
                                    <p className="value"><a href="">Our partners</a></p>
                                    <p className="value"><a href="">Become a partner</a></p>
                                    <p className="value"><a href="">Work at Future Learn</a></p>
                                    <p className="value"><a href="">Quizlet Plus</a></p>
                                </div>
                            </div>
                            <div className="col">
                                <p className="name-value">Our Company</p>
                                <hr className="bd-botton"></hr>
                                <div className="value-col">
                                    <p className="value"><a href="">Contact Us</a></p>
                                    <p className="value"><a href="">Become Teacher</a></p>
                                    <p className="value"><a href="">Blog</a></p>
                                    <p className="value"><a href="">Instructor</a></p>
                                    <p className="value"><a href="">Events</a></p>
                                </div>
                            </div>
                            <div className="col">
                                <p className="name-value">Get In Touch</p>
                                <hr className="bd-botton"></hr>
                                <div>
                                    <p style={{color: '#B2BBCC'}} className="value">when an unknown printer took galley type and scrambled</p>
                                    <p className="icon-footer">
                                        <i className="fa-brands fa-facebook icon-header"></i>
                                        <i className="fa-brands fa-twitter icon-header"></i>
                                        <i className="fa-brands fa-youtube icon-header"></i>
                                        <i className="fa-brands fa-instagram icon-header"></i>
                                    </p>
                                    <img src="/tuan-img/logo_appstore (2).png" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default CourseList;
