import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Resource/Css/CourseCreate.css';
import { useNavigate, useParams } from 'react-router-dom';

const CourseEdit = () => {
  const { courseId } = useParams(); // Get courseId from the URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // To store the selected image
  const [lectures, setLectures] = useState([]);
  const navigate = useNavigate();

  // Fetch course details and lectures when component mounts
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch course details
        const courseResponse = await axios.get(`http://localhost:8080/api/course/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const courseData = courseResponse.data.result;
        setTitle(courseData.title);
        setDescription(courseData.description);
        setPrice(courseData.price);
        setImage(courseData.img); // Store the image filename from the response

        // Fetch course lectures
        const lecturesResponse = await axios.get(`http://localhost:8080/api/lecture/getall-lecture-by-courseid/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setLectures(lecturesResponse.data.result);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleLectureChange = (index, field, value) => {
    const updatedLectures = lectures.map((lecture, i) => 
      i === index ? { ...lecture, [field]: value } : lecture
    );
    setLectures(updatedLectures);
  };

  const handleUpdateCourse = async () => {
    const token = localStorage.getItem('token');

    try {
      // Create FormData to update course data and image
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      if (image instanceof File) {
        formData.append('img', image); // Only append the new image if it's a file
      }

      // Update course details
      await axios.put(`http://localhost:8080/api/course/${courseId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update lectures
      for (const lecture of lectures) {
        let videoName = lecture.video;

        // Update lecture details
        await axios.put(`http://localhost:8080/api/lecture/${lecture.id}`, {
          title: lecture.title,
          content: lecture.content,
          video: videoName
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // If there's a new video file, upload it
        if (lecture.video instanceof File) {
          const lectureFormData = new FormData();
          lectureFormData.append('title', lecture.title);
          lectureFormData.append('file', lecture.video);
          lectureFormData.append('lecture_id', lecture.id);

          const uploadResponse = await axios.post(
            `http://localhost:8080/api/upload-video`,
            lectureFormData,
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
      }

      alert('Course updated successfully!');
      navigate('/teacher');
    } catch (error) {
      alert(`Error ${error.response.status}: ${error.response.data.code} ${error.response.data.message}`);
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Edit Course</h1>
      
      {/* Course Information */}
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow p-4 mb-5">
            <h3>General Information</h3>
            <div className="form-group mb-3">
              <label><span className="required-star">*</span>Course Title</label>
              <input 
                type="text" 
                className="form-control" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
              />
            </div>

            <div className="form-group mb-3">
              <label>Course Description</label>
              <textarea 
                className="form-control" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                maxLength="100"
              />
            </div>

            <div className="form-group mb-3">
              <label><span className="required-star">*</span>Course Price</label>
              <input 
                type="number" 
                className="form-control" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                min="0"
              />
            </div>

            {/* Display current course image */}
            {image && (
              <div className="form-group mb-3">
                <label>Current Course Image</label>
                <div>
                  <img 
                    src={`http://localhost:8080/uploads/course/${image}`} 
                    alt="Course" 
                    className="img-fluid" 
                  />
                </div>
              </div>
            )}

            {/* Upload new course image */}
            <div className="form-group mb-3">
              <label><span className="required-star">*</span>Select New Course Image (Optional)</label>
              <input 
                type="file" 
                className="form-control" 
                accept="image/*" 
                onChange={(e) => setImage(e.target.files[0])} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lecture details */}
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow p-4">
            <h3>Lecture Details</h3>
            {lectures.map((lecture, index) => (
              <div key={index} className="lecture-section mb-4">
                <div className="form-group mb-3">
                  <label><span className="required-star">*</span>Lecture Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={lecture.title} 
                    onChange={(e) => handleLectureChange(index, 'title', e.target.value)} 
                  />
                </div>

                {/* Display current video */}
                {lecture.video && typeof lecture.video === 'string' && (
                  <div className="form-group mb-3">
                    <label>Current Video</label>
                    <div>
                      <video width="100%" controls>
                        <source 
                          src={`http://localhost:8080/uploads/video/${lecture.video}`} 
                          type="video/mp4" 
                        />
                      </video>
                    </div>
                  </div>
                )}

                {/* Upload new video */}
                <div className="form-group mb-3">
                  <label><span className="required-star">*</span>Attached Video (*.mp4)</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="video/mp4" 
                    onChange={(e) => handleLectureChange(index, 'video', e.target.files[0])} 
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Video Description (Optional)</label>
                  <textarea 
                    className="form-control" 
                    value={lecture.content} 
                    onChange={(e) => handleLectureChange(index, 'content', e.target.value)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mt-4 px-4" onClick={handleUpdateCourse}>Update Course</button>
      </div>
    </div>
  );
};

export default CourseEdit;