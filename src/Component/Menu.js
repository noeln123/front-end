import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../Resource/Css/tuan-all.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBell, faBars } from '@fortawesome/free-solid-svg-icons';

const HeaderMenu = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const userInfoRef = useRef(null); 
    const dropdownRef = useRef(null); 
    const navigate = useNavigate(); 

    // Fetch user info
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get('http://localhost:8080/api/user/myinfo', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status === 200 && response.data.code === 1000) {
                        setUserInfo(response.data.result);
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        console.error('Error fetching user info:', error);
                    }
                });
        }
    }, []);

    // Handle closing menu and dropdown when clicking outside
    useEffect(() => {
        const closeMenuOnClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
            if (userInfoRef.current && !userInfoRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isMenuOpen || isDropdownOpen) {
            document.addEventListener('click', closeMenuOnClickOutside);
        } else {
            document.removeEventListener('click', closeMenuOnClickOutside);
        }

        return () => {
            document.removeEventListener('click', closeMenuOnClickOutside);
        };
    }, [isMenuOpen, isDropdownOpen]);

    // Toggle the main menu
    const toggleMenu = () => {
        setIsMenuOpen(prevIsOpen => !prevIsOpen);
    };

    // Toggle the user dropdown menu
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setUserInfo(null); 
        navigate('/login'); 
    };

    useEffect(() => {
        if (isDropdownOpen && dropdownRef.current && userInfoRef.current) {
            const dropdown = dropdownRef.current;
            const userInfo = userInfoRef.current;
            const dropdownRect = dropdown.getBoundingClientRect();
            const windowWidth = window.innerWidth;

            // Nếu dropdown tràn ra khỏi viền phải của trang
            if (dropdownRect.right > windowWidth) {
                dropdown.style.right = '0'; 
                dropdown.style.left = 'auto'; 
            } else {
                dropdown.style.left = '0'; 
                dropdown.style.right = 'auto'; 
            }
        }
    }, [isDropdownOpen]);

    return (
        <div className='menu'>
            <button ref={buttonRef} className="show_menuDetails" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} className="icon-function" />
            </button>
            <Link className="link_menu btn-home" to="/">Home</Link>
            <Link className="link_menu" to="/courses">Course</Link>

            {/* Thêm nút dẫn tới "Teacher Dashboard" nếu role là TEACHER */}
            {userInfo?.role === "TEACHER" && (
                <Link className="link_menu" to="/teacher">Teacher Dashboard</Link>
            )}

            <input type="text" placeholder="Search content" />
            <Link className="button-function btn-shopingCart" to='/cart'>
                <FontAwesomeIcon icon={faCartShopping} className="icon-function" />
            </Link>
            <a className="button-function" href="#">
                <FontAwesomeIcon icon={faBell} className="icon-function" />
            </a>
            {userInfo ? (
                <div ref={userInfoRef} className="user-info d-flex align-items-center" onClick={toggleDropdown}>
                    <img src="/viet-img/anh_tay.jpg" alt="Avatar" className="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                    <span>{userInfo.username}</span>
                    {isDropdownOpen && (
                        <div ref={dropdownRef} className="dropdown-menu">
                            <ul>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/mycourse">My Course</Link></li>
                                <li><Link to="/cart">Shopping Cart</Link></li>
                                <li onClick={handleLogout}><button className='btn-logout'>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Link to="/login" className="button_header inp-none">Log In</Link>
                    <Link to="/signup" className="button_header button-signIn inp-none">Sign Up</Link>
                </>
            )}
            {isMenuOpen && (
                <div ref={menuRef} className="sideMenu open side-menu">
                    {userInfo ? (
                        <div className="user-info d-flex align-items-center">
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn-menuDetail">Log In</Link>
                            <Link to="/signup" className="btn-menuDetail bd-bottom">Sign Up</Link>
                        </>
                    )}
                    <div className='menu-detail_list'>
                        <h6>Course List</h6>
                        <ul>
                            <li><Link className="name_course-details" to="/courses">All Courses</Link></li>
                            <li>Course 1</li>
                            <li>Course 2</li>
                            <li>Course 3</li>
                            <li>Course 4</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export { HeaderMenu };
