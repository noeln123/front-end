import React, { useState } from 'react';
import Sidebar from '../Component/SlideBar';
import GeneralManagment from './GeneralManagment';
import CourseManagment from './CourseManagment';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('general'); // default page

  const renderPage = () => {
    switch(activePage) {
      case 'general':
        return <GeneralManagment />;
      case 'courses':
        return <CourseManagment />;
      default:
        return <GeneralManagment />;
    }
  };

  return (
    <div className="d-flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-grow-1 p-3">
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminDashboard;
