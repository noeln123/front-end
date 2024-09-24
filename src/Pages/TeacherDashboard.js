import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Resource/Css/TeacherDashboard.css';
import { HeaderMenu } from '../Component/Menu';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(8);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert("Please login to view your dashboard.");
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/course/my-courses', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.code === 1000) {
          const coursesData = response.data.result;
          setCourses(coursesData);
          setApprovedCount(coursesData.filter(course => course.state === "APPROVED").length);
          setRejectedCount(coursesData.filter(course => course.state === "REJECTED").length);
          setPendingCount(coursesData.filter(course => course.state === "PENDING").length);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <HeaderMenu />
      <div className=" mt-5">
        {/* Bộ lọc trạng thái */}
        <div className="d-flex justify-content-center mb-4">
          <button className="btn btn-outline-primary mx-2">Approved ({approvedCount})</button>
          <button className="btn btn-outline-danger mx-2">Rejected ({rejectedCount})</button>
          <button className="btn btn-outline-warning mx-2">Pending ({pendingCount})</button>
        </div>

        {/* Hiển thị khóa học */}
        <div className="row">
          {currentCourses.map((course) => (
            <div key={course.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text text-truncate" title={course.description}>
                    {course.description.length > 100 ? `${course.description.substring(0, 100)}...` : course.description}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ${course.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, i) => (
                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button onClick={() => paginate(i + 1)} className="page-link">
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
