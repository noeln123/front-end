import React, { useState, useEffect, useRef } from "react";
import { HeaderMenu } from "../Component/Menu";
import Footer from "../Component/Footer";
import { useParams } from "react-router-dom";

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
  const { id } = useParams(); // Lấy id từ URL
  const [lectures, setLectures] = useState([]); // Khởi tạo một mảng lectures rỗng
  const [currentVideo, setCurrentVideo] = useState(null); // Bài giảng hiện tại sẽ được đặt là null ban đầu
  const [comments, setComments] = useState([]); // Bình luận cho bài giảng
  const videoRef = useRef(null);

  // Gọi API để lấy danh sách bài giảng
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/lecture/getall-lecture-by-courseid/${id}`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (data.code === 1000 && Array.isArray(data.result)) {
          setLectures(data.result); // Lưu danh sách bài giảng vào state
          setCurrentVideo(data.result[0]); // Đặt bài giảng đầu tiên làm video hiện tại
        } else {
          console.error("Lỗi khi lấy danh sách bài giảng:", data);
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu lấy bài giảng:", error);
      }
    };

    fetchLectures();
  }, [id]); // Gọi lại API mỗi khi id thay đổi

  // Gọi API để lấy bình luận cho bài giảng hiện tại
  useEffect(() => {
    if (currentVideo) {
      const fetchComments = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:8080/api/lecture/comment/${currentVideo.id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await response.json();
          setComments(data.result || []);
        } catch (error) {
          console.error("Lỗi khi lấy bình luận:", error);
        }
      };

      fetchComments();
    }
  }, [currentVideo]);

  // Xử lý thay đổi video khi người dùng chọn bài giảng khác
  const handleVideoChange = (lecture) => {
    setCurrentVideo(lecture);
    if (videoRef.current) {
      videoRef.current.load(); // Tải lại video khi `src` thay đổi
      videoRef.current.play(); // Tự động phát video mới nếu cần
    }
  };

  // Thêm bình luận mới
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

  return (
    <>
      <HeaderMenu />
      <div className="course_listVideo">
        <div className="main-content">
          {currentVideo && (
            <>
              <video id="video-player" controls ref={videoRef}>
                <source src={`http://localhost:8080/uploads/videos/${currentVideo.video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h2>{currentVideo.title}</h2>
              <p>Thời gian: {currentVideo.duration || 'N/A'}</p>

              <CommentList comments={comments} onAddComment={handleAddComment} />
            </>
          )}
        </div>
        <div className="sidebar">
          <p style={{ fontSize: '18px', color: "#000", fontWeight: '600' }}>Course content</p>
          <ul id="course-list">
            {lectures.map((lecture, index) => (
              <li key={lecture.id}>
                <a
                  className="text-titleVideo"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Ngăn chặn hành vi mặc định
                    handleVideoChange(lecture);
                  }}
                >
                  {index + 1}. {lecture.title}
                </a>
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
