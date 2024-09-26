import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaBook, FaBars, FaTimes } from 'react-icons/fa'; // Import thêm icon
import '../Resource/Css/SlideBar.css';

const Sidebar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`bg-dark text-white sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        style={{ height: '100vh', position: 'fixed', top: 0, left: 0 }}
      >
        <button className="btn btn-primary my-2" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />} {/* Thay thế bằng icon */}
        </button>
        <Nav className="flex-column">
          <Nav.Link
            className={`text-white ${activePage === 'general' ? 'active-link' : ''}`} // Thêm class highlight
            onClick={() => setActivePage('general')}
          >
            <FaHome className="me-2" />
            {isOpen && 'General Management'}
          </Nav.Link>
          <Nav.Link
            className={`text-white ${activePage === 'courses' ? 'active-link' : ''}`} // Thêm class highlight
            onClick={() => setActivePage('courses')}
          >
            <FaBook className="me-2" />
            {isOpen && 'Course Management'}
          </Nav.Link>
        </Nav>
      </div>
      
      <div className={`content ${isOpen ? 'content-open' : 'content-closed'}`}>
        {/* Nội dung chính sẽ được đặt ở đây */}
      </div>
    </>
  );
};

export default Sidebar;
