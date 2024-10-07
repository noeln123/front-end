import { HeaderMenu } from "../Component/Menu";
import axios from 'axios';
import Footer from "../Component/Footer";
import "../Resource/Css/tuan-all.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Counter from "../Component/ComponentCounter";

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [activeMenu, setActiveMenu] = useState('menu1');
    const counterRef = useRef(null);
    const [startCounting, setStartCounting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartCounting(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
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

    return (
        <>
            <HeaderMenu />
            <div>
                <div className="grid-body">
                    <div className="header_body">
                        <img src="/tuan-img/header_body.png" alt="Header Body" className="img-header_body" />
                        <div className="text-img_header">
                            <h2>Skills for everyone, learn everything.</h2>
                            <p>There is a big discount offer happening. Sign up for courses priced from $10 for your career and life. The discount offer will end in the next 30 days.</p>
                        </div>
                        <div className="btn-mobile_home">
                            <p>Start studying to improve your IT skills</p>
                            <Link className="start-now" style={{ textDecoration: 'none' }}>Start Now</Link>
                        </div>
                    </div>
                </div>

                <div className="contact1-body">
                    <p>Trusted by over 15,000 companies and millions of learners worldwide.</p>
                    <div className="img-contact1">
                        <img src="/tuan-img/contact1_header/cisco_logo.svg" alt="Cisco" />
                        <img src="/tuan-img/contact1_header/citi_logo.svg" alt="Citi" />
                        <img src="/tuan-img/contact1_header/ericsson_logo.svg" alt="Ericsson" />
                        <img src="/tuan-img/contact1_header/hewlett_packard_enterprise_logo.svg" alt="Hewlett Packard Enterprise" />
                        <img src="/tuan-img/contact1_header/procter_gamble_logo.svg" alt="Procter & Gamble" />
                        <img src="/tuan-img/contact1_header/samsung_logo.svg" alt="Samsung" />
                        <img src="/tuan-img/contact1_header/volkswagen_logo.svg" alt="Volkswagen" />
                    </div>
                </div>
            </div>

            {activeMenu === 'menu1' && (
                <div id="menu1" className="menu-1">
                    <div className="course-container list_course">
                        {courses.length > 0 ? (
                            <div className="course-wrapper">
                                {courses.map((course) => (
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
                </div>
            )}

            <div ref={counterRef} className="counter-section">
                <h2>Chúng tôi đã đào tạo:</h2>
                <div className="bodem grid-body">
                    <p>
                        <strong>
                            {startCounting && <Counter endNumber={1500} duration={2000} />} ++
                            <p>Students</p>
                        </strong>
                    </p>
                    <p>
                        <strong>
                            {startCounting && <Counter endNumber={300} duration={3000} />} ++
                            <p>Courses</p>
                        </strong>
                    </p>
                    <p>
                        <strong>
                            {startCounting && <Counter endNumber={50} duration={3000} />} ++
                            <p>Teachers</p>
                        </strong>
                    </p>
                </div>
            </div>

            <div className="grid-body home_teacher">
                <div className="instructor-section">
                    <span className="badge">Skilled Introduce</span>
                    <h2>Our Top Class & Expert Instructors In One Place</h2>
                    <p>when an unknown printer took a galley of type and scrambled makespecimen book has survived not only five centuries</p>
                    <Link className="btn-teacherInfor" to="/teacherInfor">See All Instructors →</Link>
                </div>
                <div className="profile-container home">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div className="select" key={index}>
                            <div className="img-teacher">
                                <div className="br-teacher"></div>
                                <img src={`./viet-img/teacher_${index + 1}.png`} alt="Mark Jukarberg" />
                            </div>
                            <div className="teacher-1">
                                <h3>Mark Jukarberg</h3>
                                <p className="title">UX Design Lead</p>
                                <a href="#" className="rating">⭐ (4.8 Ratings)</a>
                                <div className="social-icons">
                                    <a href="#"><i className="fa-brands fa-facebook"></i></a>
                                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                                    <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
                                    <a href="#"><i className="fa-brands fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Home;
