import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import '../Resource/Css/SlideBar.css';

const Sidebar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-dark text-white ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <button className="btn btn-primary my-2" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Open'} Menu
      </button>
      <Nav className="flex-column">
        <Nav.Link 
          className={`text-white ${activePage === 'general' ? 'active' : ''}`}
          onClick={() => setActivePage('general')}
        >
          General Management
        </Nav.Link>
        <Nav.Link 
          className={`text-white ${activePage === 'courses' ? 'active' : ''}`}
          onClick={() => setActivePage('courses')}
        >
          Course Management
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
