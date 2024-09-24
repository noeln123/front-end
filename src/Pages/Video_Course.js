import React, { useState } from "react";

const CourseVideo = () => {
  // State to track the current video source
  const [currentVideo, setCurrentVideo] = useState("video1.mp4");

  // Function to handle video change
  const handleVideoChange = (videoSrc) => {
    setCurrentVideo(videoSrc);
  };

  return (
    <div>
      <div className="main-content">
        {/* Video Player */}
        <video id="video-player" controls>
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="sidebar">
        <ul id="course-list">
          {/* Course List */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleVideoChange("video1.mp4");
              }}
            >
              Khóa học 1
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleVideoChange("video2.mp4");
              }}
            >
              Khóa học 2
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleVideoChange("video3.mp4");
              }}
            >
              Khóa học 3
            </a>
          </li>
          {/* Add more courses if needed */}
        </ul>
      </div>
    </div>
  );
};

export default CourseVideo;
