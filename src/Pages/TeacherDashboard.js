import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Resource/Css/TeacherDashboard.css';
import { HeaderMenu } from '../Component/Menu';
import { FaClock, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaPlus } from 'react-icons/fa'; // Import icon
import { Modal, Button, Card } from 'react-bootstrap'; // Import Bootstrap Modal
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(8);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  const [selledCourses, setSelledCourses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  // State to handle modal visibility and selected course
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lectures, setLectures] = useState([]); // Store lectures of selected course

  const [showRetryConfirmationModal, setShowRetryConfirmationModal] = useState(false);


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

    const fetchSelledCoursesAndIncome = async () => {
      try {
        let token = localStorage.getItem("token")
        // Placeholder APIs, replace these URLs with actual API endpoints.
        const selledResponse = await axios.get('http://localhost:8080/api/course/selled-courses',{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        const incomeResponse = await axios.get('http://localhost:8080/api/course/total-income',{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        
        setSelledCourses(selledResponse.data.total || 1); // Sample response structure
        setTotalIncome(incomeResponse.data.income || 0); // Sample response structure
      } catch (error) {
        console.error('Error fetching selled courses or income:', error);
      }
    };

    fetchSelledCoursesAndIncome();
    fetchCourses();
  }, []);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getCourseBorderClass = (state) => {
    switch (state) {
      case "APPROVED":
        return "border-success";
      case "REJECTED":
        return "border-danger";
      case "PENDING":
        return "border-warning";
      default:
        return "";
    }
  };

  const getIconForState = (state) => {
    switch (state) {
      case "APPROVED":
        return <FaCheckCircle className="icon-approval text-success" />;
      case "REJECTED":
        return <FaTimesCircle className="icon-rejected text-danger" />;
      case "PENDING":
        return <FaClock className="icon-pending text-warning" />;
      default:
        return null;
    }
  };

  // Function to handle modal display and fetch lectures for the selected course
  const handleViewDetail = async (course) => {
    setSelectedCourse(course);
    setShowModal(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/api/lecture/getall-lecture-by-courseid/${course.id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.code === 1000) {
        setLectures(response.data.result);
      } else {
        setLectures([]);
      }
    } catch (error) {
      console.error('Error fetching lectures:', error);
      setLectures([]);
    }
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setLectures([]); // Reset lectures when modal is closed
  };

  const handleConfirmRetry = () => {
    setShowRetryConfirmationModal(true);
  }

  return (
    <>
      <HeaderMenu />
      <div className="mt-5">

        {/* Top box containing 3 small boxes */}
        <div className="row mb-4">
          <div className="col-md-2 mb-3">
            <Card className="h-100 shadow-lg text-center">
              <Card.Body>
                <Link to={"/teacher/course/create"} className="btn-lg" variant="primary">
                  <FaPlus size={100} />
                  {/* <div>Create Course</div> */}
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-5 mb-3">
            <Card className="h-100 shadow-lg text-center">
              <Card.Body>
                <h4>Selled Courses</h4>
                <h2>{selledCourses}</h2>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-5 mb-3">
            <Card className="h-100 shadow-lg text-center">
              <Card.Body>
                <h4>Total Income</h4>
                <h2>${totalIncome}</h2>
              </Card.Body>
            </Card>
          </div>
        </div>


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
              <div className={`card h-100 shadow-sm ${getCourseBorderClass(course.state)}`}>
                <div className="icon-container">
                  {getIconForState(course.state)}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text text-truncate" title={course.description}>
                    {course.description.length > 100 ? `${course.description.substring(0, 100)}...` : course.description}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ${course.price}
                  </p>

                  {course.state === "REJECTED" && (
                    <button className="btn btn-danger mt-2" onClick={() => handleViewDetail(course)}>
                      View Detail
                    </button>
                  )}
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

        {/* Modal for viewing details of rejected course */}
        {selectedCourse && (
          <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title><b>{selectedCourse.title}</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="reject-reason-container mb-3">
                <p className="reject-reason-text">
                  <FaTimesCircle /> Reject Reason: {selectedCourse.reject_reason || "No reason provided"}
                </p>
              </div>

              {lectures.length > 0 ? (
                lectures.map((lecture) => (
                  <Card className="mb-3" key={lecture.id}>
                    <Card.Body>
                      <div className="row">
                        <div className="col-md-4">
                          <Card.Img as="video" controls>
                            <source src={`http://localhost:8080/pending/video/${lecture.video}`} type="video/mp4" />
                            Your browser does not support the video tag.
                          </Card.Img>
                        </div>
                        <div className="col-md-5">
                          <Card.Title className='no-bold'>
                            {lecture.title.length > 40
                              ? `${lecture.title.substring(0, 40)}...` 
                              : lecture.title}
                          </Card.Title>
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                          {lecture.state === "PENDING" && (
                            <p className="text-warning">
                              <FaExclamationCircle /> Pending
                            </p>
                          )}
                          {lecture.state === "APPROVED" && (
                            <p className="text-success">
                              <FaCheckCircle /> Approved
                            </p>
                          )}
                          {lecture.state === "REJECTED" && (
                            <p className="text-danger">
                              <FaExclamationCircle /> {lecture.reject_reason || "No reject reason"}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No lectures available for this course.</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='primary' onClick={handleConfirmRetry}>
                Retry 0/3
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}


        {showRetryConfirmationModal && (
        <Modal show={showRetryConfirmationModal} onHide={() => setShowRetryConfirmationModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Retry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to retry edit </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRetryConfirmationModal(false)}>
              Cancel
            </Button>
            <Link to={`course/edit/${selectedCourse.id}`} className='btn btn-primary'>
              Yes, Retry
            </Link>
          </Modal.Footer>
        </Modal> 
        )}
      </div>
    </>
  );
};

export default TeacherDashboard;
