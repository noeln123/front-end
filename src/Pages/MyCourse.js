import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from '../Component/Pagination';
import { HeaderMenu } from '../Component/Menu';
import Footer from '../Component/Footer';
import '../Resource/Css/viet-all.css';
import '../Resource/Css/tuan-all.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const MyCourse = () => {
    const [activeMenu, setActiveMenu] = useState('menu1');
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 3; // Số lượng khóa học hiển thị mỗi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleMenuClick = (menuId) => {
        setActiveMenu(menuId);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('http://localhost:8080/api/course');
                setCourses(response.data.result);
            } catch (error) {
                console.error('Error fetching courses', error);
                alert('Failed to load courses');
            }
        };

        fetchCourses();
    }, []); // Chỉ gọi fetchCourses một lần khi component mount

    const switchMenu = (menuId) => {
        setActiveMenu(menuId);
    };

    // Tính toán khóa học cần hiển thị cho trang hiện tại
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const handleNext = () => {
        if (currentPage < Math.ceil(courses.length / coursesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <HeaderMenu />
            <div className="menu">
                <div className="menu_title">
                    <h1
                        className={activeMenu === "menu1" ? "active1" : ""}
                        onClick={() => handleMenuClick("menu1")}
                    >
                        All course
                    </h1>
                    <h1
                        className={activeMenu === "menu2" ? "active1" : ""}
                        onClick={() => handleMenuClick("menu2")}
                    >
                        My lists
                    </h1>
                    <h1
                        className={activeMenu === "menu3" ? "active1" : ""}
                        onClick={() => handleMenuClick("menu3")}
                    >
                        Wishlist
                    </h1>
                    <h1
                        className={activeMenu === "menu4" ? "active1" : ""}
                        onClick={() => handleMenuClick("menu4")}
                    >
                        Archived
                    </h1>
                    <h1
                        className={activeMenu === "menu5" ? "active1" : ""}
                        onClick={() => handleMenuClick("menu5")}
                    >
                        Learning tools
                    </h1>
                </div>
            </div>

            <div className="content">
                {/* Menu 1 - All courses */}
                {activeMenu === 'menu1' && (
                    <div id="menu1" className="menu-1">
                        <div className="course-container">
                            {courses.length > 0 ? (
                                <div className="course-wrapper">
                                    {currentCourses.map((course) => (
                                        <div className="course-card" key={course.id}>
                                            <img src={`http://localhost:8080/uploads/course/${course.img}`} alt={course.name} className="course-image" />
                                            <h3 className="course-title">{course.title}</h3>
                                            <p className="course-author">By {course.teacherId}</p>
                                            <hr></hr>
                                            <Link className="start-course-btn">Start Course</Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ textAlign: 'center', margin: '100px 0' }}>No courses available at the moment.</p>
                            )}
                        </div>
                        {/* Nút điều hướng */}
                        <Pagination
                            coursesPerPage={coursesPerPage}
                            totalCourses={courses.length}
                            paginate={paginate}
                            className="btn-pages"
                        />
                    </div>
                )}
                {/* Other menus */}
                {activeMenu === 'menu2' && (
                    <div id="menu2">
                        <div className="course-promo" style={{ margin: '100px 0' }}>
                            <p style={{ fontWeight: 600, fontSize: '25px' }}>Organize and access your courses faster!</p>
                            <p style={{ fontSize: '20px' }}>
                                <a href="">Go to the All Courses tab </a>to create a list.
                            </p>
                        </div>
                    </div>
                )}
                {activeMenu === 'menu3' && (
                    <div id="menu3">
                        <button className="btn-courses"><a href="#">Browse courses now</a></button>
                    </div>
                )}
                {activeMenu === 'menu4' && (
                    <div id="menu4">
                        <div className="course-promo">
                            <p style={{ fontWeight: 600, fontSize: '25px' }}>Focus on only the courses that matter to you.</p>
                            <p style={{ fontSize: '20px' }}>
                                <a href="">Go to the All Courses tab </a>to archive.
                            </p>
                        </div>
                    </div>
                )}
                {activeMenu === 'menu5' && (
                    <div id="menu5">
                        <div className="inf-tools">
                            <h1>Learning reminders</h1>
                            <h2>Calendar events</h2>
                            <p>
                                Learning a little each day adds up. Research shows that students who make learning a habit are more
                                likely to reach their goals.
                            </p>
                            <p style={{ fontSize: '14px', color: '#6a6f73' }}>Requires Google Calendar, Apple Calendar, or Outlook</p>
                            <button onClick={() => switchMenu('menu8')}>
                                Schedule learning time <span>+</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal menus */}
                {activeMenu === 'menu6' && (
                    <div id="menu6" className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Learning reminders</h2>
                                <p>Step 1 of 3</p>
                                <button className="close_button" onClick={() => switchMenu('menu1')}><i className="fa-solid fa-xmark"></i></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <label htmlFor="reminder-name">Name <span className="optional">(Optional)</span></label>
                                    <input type="text" id="reminder-name" name="reminder-name" placeholder="Example: Front-end Development" />
                                    <p>Example: Front-end Development</p>
                                    <button className="next-button" onClick={() => switchMenu('menu7')}>Next</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {activeMenu === 'menu7' && (
                    <div id="menu7" className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Learning reminders</h2>
                                <p>Step 2 of 3</p>
                                <button className="close_button" onClick={() => switchMenu('menu1')}><i className="fa-solid fa-xmark"></i></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <label htmlFor="repeat">Repeat</label>
                                    <input type="text" id="repeat" name="reminder-repeat" placeholder="Every week on Monday" />
                                    <p>Example: Every week on Monday</p>
                                    <button className="next-button" onClick={() => switchMenu('menu1')}>Next</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Pagination />
            <Footer />
        </>
    );
};

export default MyCourse;
