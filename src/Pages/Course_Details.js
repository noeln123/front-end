import React, { useState } from "react";
import Footer from "../Component/Footer";
import { HeaderMenu } from "../Component/Menu";
import "../Resource/Css/tuan-all.css"; // Ensure styles are applied correctly
import { Link } from "react-router-dom";
const CourseDetail = () => {
  const [toggleInfo, setToggleInfo] = useState({
    info1: false,
    info2: false,
    info3: false,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false); // Track purchase state
  const [showDetails, setShowDetails] = useState(false);
  const [detailsPosition, setDetailsPosition] = useState({ left: 0, top: 0 });

  const handleToggleInfo = (infoId) => {
    setToggleInfo((prevState) => ({
      ...prevState,
      [infoId]: !prevState[infoId],
    }));
  };

  const handleToggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const handleShowDetails = (event) => {
    const left = event.target.offsetLeft + event.target.offsetWidth;
    const top = event.target.offsetTop;
    setDetailsPosition({ left, top });
    setShowDetails(true);
  };

  const handleHideDetails = () => {
    setShowDetails(false);
  };

  const handlePurchase = () => {
    // Simulate purchase
    setIsPurchased(true);
  };

  return (
    <>
      <HeaderMenu />

      <div className="grid-body">
        <div className="body-course_detail">
          <div className="container_course-detail">
            <div className="bdContainer_course-detail">
              <div className="show_course-detail">
                <h1>Lesson Content</h1>
                <ul className="content_course-detail">
                  {[
                    "You will master the Python programming language by building 100 unique projects over 100 days.",
                    "You will be able to program in Python professionally",
                    "Create a portfolio of 100 Python projects to apply for developer jobs",
                    "You will learn Selenium, Beautiful Soup, Request, Flask, Pandas, NumPy, Scikit Learn, Plotly, and Matplotlib.",
                    "Be able to build fully fledged websites and web apps with Python",
                    "Build games like Blackjack, Pong and Snake using Python",
                  ].map((item, index) => (
                    <li
                      key={index}
                      onMouseEnter={handleShowDetails}
                      onMouseLeave={handleHideDetails}
                    >
                      <img
                        className="icon_content_course-detail"
                        src="https://png.pngtree.com/png-vector/20230910/ourmid/pngtree-3d-tick-sign-icon-png-image_9225323.png"
                        alt="Tick Icon"
                      />
                      <div>{item}</div>
                    </li>
                  ))}
                </ul>
                {showDetails && (
                  <div
                    id="course-details"
                    className="details-visible"
                    style={{
                      left: `${detailsPosition.left}px`,
                      top: `${detailsPosition.top}px`,
                    }}
                  >
                    <p>More information about the course...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Course Content Toggle Section */}
            <div className="list-content_course">
              <h2>Course Content</h2>
              <div>
                <button className="toggle-button" onClick={() => handleToggleInfo("info1")}>
                  <h3>Introduction</h3>
                  <div>
                    <span>5 lessons</span>
                    <span>7 minutes each</span>
                  </div>
                </button>
                {toggleInfo.info1 && (
                  <div className="info-content">This is the information for Introduction.</div>
                )}

                <button className="toggle-button" onClick={() => handleToggleInfo("info2")}>
                  Button 2
                </button>
                {toggleInfo.info2 && (
                  <div className="info-content">This is the information for Button 2.</div>
                )}

                <button className="toggle-button" onClick={() => handleToggleInfo("info3")}>
                  Button 3
                </button>
                {toggleInfo.info3 && (
                  <div className="info-content">This is the information for Button 3.</div>
                )}
              </div>
            </div>

            {/* Expand/Collapse Content Section */}
            <div className={`content-box ${isExpanded ? "expanded" : ""}`}>
              <p id="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>
              <br />
              <button id="toggleButton" onClick={handleToggleContent}>
                {isExpanded ? "Thu gọn" : "Xem thêm"}
              </button>
            </div>
          </div>

          {/* Course Details Section */}
          <div className="course-detail_right">
            <iframe
              width="400"
              height="250"
              src="https://www.youtube.com/embed/GmWxyjJhYnY?si=lZemTWPTTp6NYx55"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <div className="content_course-detail_right">
              <h2>$12.00</h2>
              {!isPurchased ? (
                <>
                  <button className="btn-course_details">Add to cart</button>
                  <button className="btn-course_details" onClick={handlePurchase}>
                    Buy
                  </button>
                </>
              ) : (
                <Link className="btn-course_details start_course" to='/courseVideo'>Start Now</Link>
              )}
              <p style={{ textAlign: "center", margin: "20px 0" }}>
                30-day money-back guarantee
              </p>
              <h3>This course includes:</h3>
              <ul>
                <li>4 articles</li>
                <li>Access on mobile devices and TV</li>
                <li>Lifetime full access</li>
                <li>Completion certificate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetail;
