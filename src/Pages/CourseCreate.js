import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Resource/Css/CourseCreate.css';
import { useNavigate } from 'react-router-dom';

const CourseCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [lectures, setLectures] = useState([{ title: '', content: '', video: null }]);
  const navigate = useNavigate();

  const handleAddLecture = () => {
    setLectures([...lectures, { title: '', content: '', video: null }]);
  };

  const handleLectureChange = (index, field, value) => {
    const newLectures = lectures.map((lecture, i) => 
      i === index ? { ...lecture, [field]: value } : lecture
    );
    setLectures(newLectures);
  };

  const handleCreateCourse = async () => {
    const token = localStorage.getItem('token');

    try {
      const courseResponse = await axios.post('http://localhost:8080/api/course', {
        title,
        description,
        price,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (courseResponse.data.code === 1000) {
        const courseId = courseResponse.data.result.id;

        for (const lecture of lectures) {
          let videoName = 'None';
          if (lecture.video) {
            const formData = new FormData();
            formData.append('file', lecture.video);
      
            const uploadResponse = await axios.post(
              'http://localhost:8080/api/upload-video',
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data'
                }
              }
            );
      
            if (uploadResponse.status === 200) {
              videoName = uploadResponse.data.result;
            } else {
              throw new Error('Failed to upload video');
            }
          }

          await axios.post(`http://localhost:8080/api/lecture/${courseId}`, {
            title: lecture.title,
            content: lecture.content,
            video: videoName
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }

        alert('Course created successfully!');
        navigate('/teacher');
      }
    } catch (error) {
      alert(`Error ${error.response.status}: ${error.response.data.code} ${error.response.data.message}`);
      console.error('Error creating course:', error);
    }
  };

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Create New Course</h1>
      
      {/* Thông tin khóa học */}
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow p-4 mb-5">
            <h3>Thông tin chung</h3>
            <div className="form-group mb-3">
              <label>Tên khóa học</label>
              <input 
                type="text" 
                className="form-control" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
              />
            </div>

            <div className="form-group mb-3">
              <label>Mô tả ngắn gọn khóa học</label>
              <textarea 
                className="form-control" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                maxLength="100"
              />
            </div>

            <div className="form-group mb-3">
              <label>Giá bán khóa học</label>
              <input 
                type="number" 
                className="form-control" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chi tiết bài giảng */}
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow p-4">
            <h3>Chi tiết khóa học</h3>
            {lectures.map((lecture, index) => (
              <div key={index} className="lecture-section mb-4">
                <div className="form-group mb-3">
                  <label>Tên bài giảng</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={lecture.title} 
                    onChange={(e) => handleLectureChange(index, 'title', e.target.value)} 
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Nội dung bài giảng</label>
                  <textarea 
                    className="form-control" 
                    value={lecture.content} 
                    onChange={(e) => handleLectureChange(index, 'content', e.target.value)} 
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Video đính kèm</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="video/mp4" 
                    onChange={(e) => handleLectureChange(index, 'video', e.target.files[0])} 
                  />
                </div>
              </div>
            ))}

            <button type="button" className="btn btn-success" onClick={handleAddLecture}>
              + Thêm bài giảng
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mt-4 px-4" onClick={handleCreateCourse}>Create Course</button>
      </div>
    </div>
  );
};

export default CourseCreate;
