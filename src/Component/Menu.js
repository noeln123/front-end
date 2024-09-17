import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "../Resource/Css/tuan-all.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBell, faBars } from '@fortawesome/free-solid-svg-icons';

const HeaderMenu = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

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
                        // Token không hợp lệ hoặc hết hạn, không làm gì cả
                    } else {
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
        };

        if (isMenuOpen) {
            document.addEventListener('click', closeMenuOnClickOutside);
        } else {
            document.removeEventListener('click', closeMenuOnClickOutside);
        }

        return () => {
            document.removeEventListener('click', closeMenuOnClickOutside);
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(prevIsOpen => !prevIsOpen);
    };

    return (
        <div className='menu'>
            <button ref={buttonRef} className="show_menuDetails" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} className="icon-function" />
            </button>
            <Link className="link_menu btn-home" to="/">Home</Link> {/* Updated to use Link */}
            <Link className="link_menu" to="/courses">Course</Link> {/* Updated to use Link */}
            <input type="text" placeholder="Search content" />
            <a className="button-function btn-shopingCart" href="#">
                <FontAwesomeIcon icon={faCartShopping} className="icon-function" />
            </a>
            <a className="button-function" href="#">
                <FontAwesomeIcon icon={faBell} className="icon-function" />
            </a>
            {userInfo ? (
                            <div className="user-info d-flex align-items-center">
                            <img src="/viet-img/anh_tay.jpg" alt="Avatar" className="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                            <span>{userInfo.username}</span>
                            
                        </div>
                        ) : (
                            <>
                                <Link to="/login" className="button_header inp-none">Log In</Link>
                                <Link className="button_header button-signIn inp-none">Sign In</Link>
                            </>
                        )}
            {isMenuOpen && (
                <div ref={menuRef} className="sideMenu open side-menu">
                    <Link to="/login" className="btn-menuDetail">Log In</Link>
                    <Link className="btn-menuDetail bd-bottom">Sign In</Link>
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
