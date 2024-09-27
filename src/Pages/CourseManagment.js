import React, { useState, useEffect } from 'react';
import { Button, Tab, Tabs, Form, Badge } from 'react-bootstrap';
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
  const [prevPendingCourses, setPrevPendingCourses] = useState([]);

  console.log("start");

  const POLLING_INTERVAL = 5000; // 5 giây

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
          setCourses(data.result);
          
          // Nếu danh sách khóa học Pending thay đổi, thông báo người dùng
          const pendingCourses = data.result.filter(course => course.state === 'PENDING');
          console.log("pending" + JSON.stringify(pendingCourses));
          if (JSON.stringify(pendingCourses) !== JSON.stringify(prevPendingCourses)) {
            toast.info('New pending courses detected!');
            setPrevPendingCourses(pendingCourses); // Cập nhật danh sách khóa học Pending trước đó
            console.log("prev"+JSON.stringify(prevPendingCourses));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    // Gọi API lần đầu tiên khi component được render
    fetchCourses();

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
      <ToastContainer />
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

  const handleDetail = (course) => {
    alert(`Detail for course: ${course.title}\nDescription: ${course.description}`);
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
                <Button variant="danger" className="me-1" onClick={() => handleReject(course.id)}>Reject</Button> {/* Nút reject mới */}
                <Button variant="info" onClick={() => handleDetail(course)}>Detail</Button>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">No pending courses</li>
        )}
      </ul>
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
