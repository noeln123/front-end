import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../Resource/Css/tuan-all.css";
import "../Resource/Css/tuan2.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBell, faBars } from '@fortawesome/free-solid-svg-icons';

const HeaderMenu = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const userInfoRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

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

    useEffect(() => {
        const closeMenuOnClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
            if (userInfoRef.current && !userInfoRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (isNotificationOpen && !event.target.closest('.navbar__notiboard')) {
                setIsNotificationOpen(false);
            }
        };

        if (isMenuOpen || isDropdownOpen || isNotificationOpen) {
            document.addEventListener('click', closeMenuOnClickOutside);
        } else {
            document.removeEventListener('click', closeMenuOnClickOutside);
        }

        return () => {
            document.removeEventListener('click', closeMenuOnClickOutside);
        };
    }, [isMenuOpen, isDropdownOpen, isNotificationOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(prevIsOpen => !prevIsOpen);
    };

    const toggleDropdown = () => {
        if (isNotificationOpen) {
            setIsNotificationOpen(false); // Đóng thông báo nếu đang mở
        }
        setIsDropdownOpen(prev => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserInfo(null);
        navigate('/login');
    };

    const toggleNotification = () => {
        if (isDropdownOpen) {
            setIsDropdownOpen(false); // Đóng dropdown nếu đang mở
        }
        setIsNotificationOpen(prev => !prev);
    };

    return (
        <div className='menu'>
            <button ref={buttonRef} className="show_menuDetails" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} className="icon-function" />
            </button>
            <Link className="link_menu btn-home" to="/">Home</Link>
            <Link className="link_menu" to="/courses">Course</Link>

            <input type="text" placeholder="Search content" />
            <Link className="button-function btn-shopingCart" to='/cart'>
                <FontAwesomeIcon icon={faCartShopping} className="icon-function" />
            </Link>
            <a className="button-function" onMouseEnter={toggleNotification}>
                <FontAwesomeIcon icon={faBell} className="icon-function" />
            </a>
            {isNotificationOpen && (
                <div className="navbar__notiboard">
                    <div className="navbar__arrowup"></div>
                    <div className="navbar__notiboard-header">
                        <h3>Thông báo mới nhận</h3>
                    </div>
                    <ul className="navbar__notiboard-list">
                        <li className="navbar__notiboard-item">
                            <a href="#" className="navbar__notiboard-link">
                                <img src="./assets (chứa file tĩnh)/img/tuixach1.png" alt="" className="navbar__notiboard-img" />
                                <div className="navbar__notiboard-info">
                                    <p className="navbar__notiboard-name">
                                        Mỹ phẩm Ohuy chính hãng phẩm Ohuy chính hãng phẩm Ohuy chính hãng phẩm Ohuy chính hãng
                                    </p>
                                    <p className="navbar__notiboard-desc">
                                        Đây là 1 đoạn mô tả của sản phẩm
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className="navbar__notiboard-item navbar__notiboard-item-viewed">
                            <a href="#" className="navbar__notiboard-link">
                                <img src="./assets (chứa file tĩnh)/img/tuixach1.png" alt="" className="navbar__notiboard-img" />
                                <div className="navbar__notiboard-info">
                                    <p className="navbar__notiboard-name">
                                        Mỹ phẩm Ohuy chính hãng
                                    </p>
                                    <p className="navbar__notiboard-desc">
                                        Đây là 1 đoạn mô tả của sản phẩm
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className="navbar__notiboard-item">
                            <a href="#" className="navbar__notiboard-link">
                                <img src="./assets (chứa file tĩnh)/img/tuixach1.png" alt="" className="navbar__notiboard-img" />
                                <div className="navbar__notiboard-info">
                                    <p className="navbar__notiboard-name">
                                        Mỹ phẩm Ohuy chính hãng
                                    </p>
                                    <p className="navbar__notiboard-desc">
                                        Đây là 1 đoạn mô tả của sản phẩm
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className="navbar__notiboard-item">
                            <a href="#" className="navbar__notiboard-link">
                                <img src="./assets (chứa file tĩnh)/img/tuixach1.png" alt="" className="navbar__notiboard-img" />
                                <div className="navbar__notiboard-info">
                                    <p className="navbar__notiboard-name">
                                        Mỹ phẩm Ohuy chính hãng
                                    </p>
                                    <p className="navbar__notiboard-desc">
                                        Đây là 1 đoạn mô tả của sản phẩm
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <footer className="navbar__notiboard-footer">
                        <a href="#" className="navbar__notiboard-footer-link">
                            Xem tất cả
                        </a>
                    </footer>
                </div>
            )}
            
            {userInfo ? (
                <div ref={userInfoRef} className="user-info d-flex align-items-center" onClick={toggleDropdown}>
                    <img src="/viet-img/anh_tay.jpg" alt="Avatar" className="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                    <span>{userInfo.username}</span>
                    {isDropdownOpen && (
                        <div ref={dropdownRef} className="dropdown-menu">
                            <ul>
                                <li><Link className='btn1-avt' to="/accountInfor">
                                    <i className="fa-regular fa-user icon-avt"></i>
                                    Profile
                                </Link></li>
                                <li><Link className='btn1-avt' to="/mycourse">
                                    <i className="fa-solid fa-book icon-avt"></i>
                                    My Course</Link>
                                </li>
                                <li><Link className='btn1-avt' to="/cart">
                                    <i className="fa-solid fa-cart-shopping icon-avt"></i>
                                    Shopping Cart</Link></li>
                                {userInfo?.role === "TEACHER" && (
                                    <li><Link className="link_menu btn1-avt" style={{ margin: "0" }} to="/teacher">
                                        <i className="fa-solid fa-gauge-high icon-avt"></i>
                                        Teacher Dashboard</Link>
                                    </li>
                                )}
                                {userInfo?.role === "ADMIN" && (
                                    <li><Link className="link_menu btn1-avt" style={{ margin: "0" }} to="/admin">
                                        <i className="fa-solid fa-user-tie icon-avt"></i>
                                        Admin Dashboard</Link>
                                    </li>
                                )}
                                <li onClick={handleLogout}><button className='btn-logout btn1-avt'>
                                    <i className="fa-solid fa-right-to-bracket icon-avt"></i>
                                    Logout
                                </button></li>
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
