import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../Resource/Css/tuan-all.css'

const Footer = () => {
  return (
    <footer>
      <div className="body-footer">
        <div className="grid-body">
          <div className="show_body-footer">
            {/* First Column */}
            <div className="col">
              <p className="value">
                We provide scientific training to help you supplement necessary knowledge and skills to improve your skills.
              </p>
              <p className="value">8a Ton That Thuyet, My Dinh, Ha Noi</p>
              <p className="value">0123 456 789</p>
            </div>

            {/* Second Column */}
            <div className="col">
              <p className="name-value">Useful Links</p>
              <hr className="bd-botton" />
              <div className="value-col">
                <p className="value"><a href="#">Our values</a></p>
                <p className="value"><a href="#">Our advisory board</a></p>
                <p className="value"><a href="#">Our partners</a></p>
                <p className="value"><a href="#">Become a partner</a></p>
                <p className="value"><a href="#">Work at Future Learn</a></p>
                <p className="value"><a href="#">Quizlet Plus</a></p>
              </div>
            </div>

            {/* Third Column */}
            <div className="col">
              <p className="name-value">Our Company</p>
              <hr className="bd-botton" />
              <div className="value-col">
                <p className="value"><a href="#">Contact Us</a></p>
                <p className="value"><a href="#">Become Teacher</a></p>
                <p className="value"><a href="#">Blog</a></p>
                <p className="value"><a href="#">Instructor</a></p>
                <p className="value"><a href="#">Events</a></p>
              </div>
            </div>

            {/* Fourth Column */}
            <div className="col">
              <p className="name-value">Get In Touch</p>
              <hr className="bd-botton" />
              <div>
                <p style={{ color: '#B2BBCC' }} className="value">
                  when an unknown printer took galley type and scrambled
                </p>
                <p className="icon-footer">
                  <FontAwesomeIcon icon={faFacebook} className="icon-header" />
                  <FontAwesomeIcon icon={faTwitter} className="icon-header" />
                  <FontAwesomeIcon icon={faYoutube} className="icon-header" />
                  <FontAwesomeIcon icon={faInstagram} className="icon-header" />
                </p>
                <img src="/tuan-img/logo_appstore (2).png" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
