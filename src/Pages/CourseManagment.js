import React, { useState, useEffect, useRef } from 'react';
import { Button, Tab, Tabs, Form, Badge, Modal, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../Resource/Css/CourseManagment.css';

const CourseManagment = () => {
  const [key, setKey] = useState('approved');
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Thêm trạng thái để tracking các khóa học trước đó
  const prevPendingCoursesRef = useRef([]);

  console.log("start");

  const POLLING_INTERVAL = 5000; // 5 giây

  const fetchCoursesFirst = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const response = await fetch('http://localhost:8080/api/admin/getallcourse', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.code === 1000) {
          setCourses(data.result)
        }
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  // Fetch courses từ API
  const fetchCourses = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const response = await fetch('http://localhost:8080/api/admin/getallcourse', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.code === 1000) {
          let course_track = data.result
        
          // Nếu danh sách khóa học Pending thay đổi, thông báo người dùng
          const pendingCourses = data.result.filter(course_track => course_track.state === 'PENDING');
          const prevPendingCourses = prevPendingCoursesRef.current;
          console.log("pending" + pendingCourses.length);
          if (pendingCourses.length > prevPendingCourses.length) {
            toast.info('New pending courses detected!');
            prevPendingCoursesRef.current = pendingCourses; // Cập nhật danh sách khóa học Pending trước đó
            console.log("prev"+prevPendingCoursesRef.current.length);
            setCourses(data.result);
          } else {
            prevPendingCoursesRef.current = pendingCourses; //khi nhỏ hơn thì tức là đã bị thay đổi state -> cập nhật prev sao cho đúng với current
          }
        }
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    // Gọi API lần đầu tiên khi component được render
    fetchCoursesFirst()

    // Bắt đầu Polling sau mỗi 5 giây
    const interval = setInterval(() => {
      fetchCourses();
    }, POLLING_INTERVAL);

    // Dọn dẹp interval khi component bị hủy
    return () => clearInterval(interval);
  }, []);

  // Filter courses by search term
  const filteredCourses = courses.filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const approvedCourses = filteredCourses.filter(course => course.state === 'APPROVED');
  const pendingCourses = filteredCourses.filter(course => course.state === 'PENDING');
  const rejectedCourses = filteredCourses.filter(course => course.state === 'REJECTED');

  return (
    <div>
      <h2>Course Management</h2>

      {/* Search Bar */}
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search courses by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="approved" title="Approved">
          <ApprovedCourses courses={approvedCourses} setCourses={setCourses} />
        </Tab>
        <Tab eventKey="pending" title="Pending">
          <PendingCourses courses={pendingCourses} setCourses={setCourses} />
        </Tab>
        <Tab eventKey="rejected" title="Rejected">
          <RejectedCourses courses={rejectedCourses} />
        </Tab>
      </Tabs>
    </div>
  );
};

const ApprovedCourses = ({ courses, setCourses }) => {
  const handleReject = async (courseId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/admin/rejectcourse/${courseId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.code === 1000) {
        toast.success('Course has been rejected successfully!', {
          autoClose: 3000,
        });

        // Update the course state after rejection
        setCourses(prevCourses => prevCourses.map(course =>
          course.id === courseId ? { ...course, state: 'REJECTED' } : course
        ));
      }
    } catch (error) {
      console.error('Error rejecting course:', error);
      toast.error('Failed to reject the course');
    }
  };

  return (
    <div>
      <h4>Approved Courses</h4>
      <ul className="list-group">
        {courses.length > 0 ? (
          courses.map((course) => (
            <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
              {course.title}
              <Button variant="danger" onClick={() => handleReject(course.id)}>Delete</Button>
            </li>
          ))
        ) : (
          <li className="list-group-item">No approved courses</li>
        )}
      </ul>
    </div>
  );
};

const PendingCourses = ({ courses, setCourses }) => {
  const [autoAccept, setAutoAccept] = useState(false); // State for auto accept toggle
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch the current autoAccept setting from the API
  useEffect(() => {
    const fetchAutoAccept = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8080/api/admin/settings', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.code === 1000) {
          setAutoAccept(data.result.auto_accept); // Set the current state from API
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchAutoAccept();
  }, []);

  // Handle the toggle change for auto accept
  const handleToggleAutoAccept = async () => {
    const token = localStorage.getItem('token');
    const newAutoAccept = !autoAccept; // Toggle the current state
    try {
      const response = await fetch('http://localhost:8080/api/admin/settings/auto_accept', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ autoAccept: newAutoAccept })
      });
      const data = await response.json();
      if (data.code === 1000) {
        toast.success(`Auto accept is now ${newAutoAccept ? 'enabled' : 'disabled'}!`, {
          autoClose: 3000,
        });
        setAutoAccept(newAutoAccept); // Update the state
      }
    } catch (error) {
      console.error('Error updating auto accept setting:', error);
      toast.error('Failed to update auto accept setting');
    }
  };

  const handleAccept = async (courseId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/admin/approvalcourse/${courseId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.code === 1000) {
        toast.success('Course has been approved successfully!', {
          autoClose: 3000,
        });

        // Update the course state after approval
        setCourses(prevCourses => prevCourses.map(course =>
          course.id === courseId ? { ...course, state: 'APPROVED' } : course
        ));
      }
    } catch (error) {
      console.error('Error approving course:', error);
      toast.error('Failed to approve the course');
    }
  };

  const handleReject = (course) => {
    setSelectedCourse(course); // Set the selected course
    setShowModal(true); // Show the modal to input reason
  };

  const confirmReject = async () => {
    const token = localStorage.getItem('token');
    if (!selectedCourse) return;

    try {
      const response = await fetch(`http://localhost:8080/api/admin/rejectcourse/${selectedCourse.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }), // Pass the rejection reason to the API
      });
      const data = await response.json();
      if (data.code === 1000) {
        toast.success('Course has been rejected successfully!', {
          autoClose: 3000,
        });

        // Update the course state after rejection
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === selectedCourse.id ? { ...course, state: 'REJECTED' } : course
          )
        );
      }
    } catch (error) {
      console.error('Error rejecting course:', error);
      toast.error('Failed to reject the course');
    }
    setShowModal(false); // Close modal after rejection
  };

  const [showDetailModal, setShowDetailModal] = useState(false); // State để mở modal
  const [authorName, setAuthorName] = useState('');
  const [lectures, setLectures] = useState([]);

  const handleDetail = async (course) => {
    setSelectedCourse(course); // Đặt khóa học đã chọn
    setShowDetailModal(true); // Hiển thị modal

    try {
      // Gọi API để lấy tên tác giả
      const responseAuthor = await fetch(`http://localhost:8080/api/course/get-teacher-name/${course.id}`);
      const authorData = await responseAuthor.json();
      if (authorData.code === 1000) {
        setAuthorName(authorData.result);
      }

      // Gọi API để lấy thông tin bài giảng
      let token = localStorage.getItem("token");
      const responseLectures = await fetch(`http://localhost:8080/api/lecture/getall-lecture-by-courseid/${course.id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const lecturesData = await responseLectures.json();
      if (lecturesData.code === 1000) {
        setLectures(lecturesData.result);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleAcceptLecture = async (lectureId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/admin/approvelecture/${lectureId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.code === 1000) {
        toast.success('Lecture has been approved successfully!');
        // Cập nhật trạng thái lecture sau khi được chấp nhận
        setLectures((prevLectures) =>
          prevLectures.map((lecture) =>
            lecture.id === lectureId ? { ...lecture, state: 'APPROVED' } : lecture
          )
        );
      }
    } catch (error) {
      console.error('Error approving lecture:', error);
      toast.error('Failed to approve the lecture');
    }
  };

  return (
    <div>
      <h4>Pending Courses</h4>

      {/* Toggle for auto accept with AI and BETA badges */}
      <div className="d-flex align-items-center mb-3">
        <Form.Check
          type="switch"
          id="auto-accept-switch"
          label="Auto Accept"
          checked={autoAccept}
          onChange={handleToggleAutoAccept}
          className="mr-2"
        />
        {/* Badges for AI and BETA */}
        <Badge bg="dark" text="light" className="mr-1"><i className="fa-solid fa-wand-magic-sparkles"></i> AI</Badge>
        <Badge bg="info" text="light">BETA</Badge>
      </div>

      <ul className="list-group">
        {courses.length > 0 ? (
          courses.map((course) => (
            <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
              {course.title}
              <div>
                <Button variant="success" className="me-2" onClick={() => handleAccept(course.id)}>Accept</Button>
                <Button variant="danger" className="me-1" onClick={() => handleReject(course)}>Reject</Button> {/* Nút reject mới */}
                <Button variant="info" onClick={() => handleDetail(course)}>Detail</Button>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">No pending courses</li>
        )}
      </ul>

      {/* Modal for entering rejection reason */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="rejectionReason">
            <Form.Label>Reason for rejection</Form.Label>
            <Form.Control
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter rejection reason..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmReject}>
            Reject Course
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal hiển thị chi tiết khóa học */}
      {selectedCourse && (
        <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedCourse.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>By {authorName}</h5>

            {/* Danh sách bài giảng dưới dạng các card */}
            {lectures.map((lecture) => (
              <Card className="mb-3" key={lecture.id}>
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div className="lecture-thumbnail">
                    <video width="100" height="60" controls>
                      <source src={`http://localhost:8080/uploads/videos/${lecture.video}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="lecture-title">
                    <h6>{lecture.title}</h6>
                  </div>
                  <div className="lecture-actions">
                    {lecture.state === 'PENDING' && (
                      <Button variant="success" onClick={() => handleAcceptLecture(lecture.id)}>
                        Accept
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <ToastContainer />



    </div>
  );
};

const RejectedCourses = ({ courses }) => {
  return (
    <div>
      <h4>Rejected Courses</h4>
      <ul className="list-group">
        {courses.length > 0 ? (
          courses.map((course) => (
            <li key={course.id} className="list-group-item">
              {course.title}
            </li>
          ))
        ) : (
          <li className="list-group-item">No rejected courses</li>
        )}
      </ul>
    </div>
  );
};

export default CourseManagment;
