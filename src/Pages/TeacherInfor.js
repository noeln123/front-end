import { HeaderMenu } from "../Component/Menu"
import Footer from "../Component/Footer"
import React, { useState } from 'react';
import '../Resource/Css/viet-all.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TeacherInfor = () => {
  return (
    <>
    <HeaderMenu />
      <div className="profile-container">
        {Array.from({ length: 6 }).map((_, index) => (
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
      <Footer />
    </>
  );
};

export default TeacherInfor;
