// src/CourseVideo.js
import React, { useState } from "react";
import { HeaderMenu } from "../Component/Menu";
import Footer from "../Component/Footer";

const CourseVideo = () => {
  const [currentVideo, setCurrentVideo] = useState("video1.mp4");
  
  const handleVideoChange = (videoSrc) => {
    setCurrentVideo(videoSrc);
  };

  const CommentList = () => {
    const [comments, setComments] = useState([
      { text: 'Comment của Tuấn', username: 'Tuấn' },
      { text: 'Comment của Khải', username: 'Khải' }
    ]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
      if (newComment) {
        setComments([...comments, { text: newComment, username: 'Bạn' }]);
        setNewComment('');
      }
    };

  return (
    <>
      <HeaderMenu />
      <div className="course_listVideo">
        <div className="main-content">
          <video id="video-player" controls>
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <CommentList />
        </div>
        <div className="sidebar">
          <ul id="course-list">
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
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};}

export default CourseVideo;
