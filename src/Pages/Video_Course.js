import React, { useState, useEffect } from "react";
import { HeaderMenu } from "../Component/Menu";
import Footer from "../Component/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const courses = [
  { id: 1, title: "Khóa học 1", videoSrc: "video1.mp4", duration: "10:00", content: "Nội dung khóa học 1" },
  { id: 2, title: "Khóa học 2", videoSrc: "video2.mp4", duration: "15:30", content: "Nội dung khóa học 2" },
  { id: 3, title: "Khóa học 3", videoSrc: "video3.mp4", duration: "20:45", content: "Nội dung khóa học 3" },
];

const CommentList = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div>
      <div className="comment-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.username || 'Người dùng'}: </strong>{comment.msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Thêm bình luận..."
      />
      <button onClick={handleAddComment}>Gửi</button>
    </div>
  );
};

const CourseVideo = () => {
  const [currentVideo, setCurrentVideo] = useState(courses[0]);
  const [comments, setComments] = useState([]); // Khởi tạo là một mảng rỗng
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/lecture/comment/${currentVideo.id}`);
        const data = await response.json();

        // Kiểm tra dữ liệu trả về
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          console.warn("Dữ liệu bình luận không phải là mảng:", data);
          setComments([]); // Đặt là mảng rỗng nếu không phải
        }
      } catch (error) {
        console.error("Lỗi khi lấy bình luận:", error);
      }
    };

    fetchComments();
  }, [currentVideo]);

  const handleVideoChange = (course) => {
    setCurrentVideo(course);
    setOpenIndex(null);
  };

  const handleAddComment = async (newComment) => {
    const commentData = { msg: newComment, user_id: null }; // Thay null bằng user_id thực tế nếu có

    try {
      const response = await fetch(`http://localhost:8080/api/lecture/comment/${currentVideo.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const addedComment = await response.json();
        setComments([...comments, addedComment]); // Thêm bình luận mới vào danh sách
      } else {
        console.error("Lỗi khi thêm bình luận:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <HeaderMenu />
      <div className="course_listVideo">
        <div className="main-content">
          <video id="video-player" controls>
            <source src={currentVideo.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h2>{currentVideo.title}</h2>
          <p>Thời gian: {currentVideo.duration}</p>

          <CommentList comments={comments} onAddComment={handleAddComment} />
        </div>
        <div className="sidebar">
          <p style={{ fontSize: '18px', color: "#000", fontWeight: '600' }}>Course content</p>
          <ul id="course-list">
            {courses.map((course, index) => (
              <li key={course.id}>
                <a className="text-titleVideo"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Ngăn chặn hành vi mặc định
                    toggleDropdown(index);
                  }}
                >
                  {index + 1}. {course.title}
                  <FontAwesomeIcon style={{ float: 'right' }} icon={openIndex === index ? faCaretUp : faCaretDown} />
                </a>
                {openIndex === index && (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      handleVideoChange(course);
                    }}
                    className="drop-down_detail">
                    <p>Nội dung: {course.content}</p>
                    <p>Thời gian: {course.duration}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseVideo;
