import React, { useState, useEffect } from 'react';
import { Button, Tab, Tabs, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseManagment = () => {
  const [key, setKey] = useState('approved');
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch courses from the API
  useEffect(() => {
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
          }
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
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
          <ApprovedCourses courses={approvedCourses} />
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

const ApprovedCourses = ({ courses }) => {
  return (
    <div>
      <h4>Approved Courses</h4>
      <ul className="list-group">
        {courses.length > 0 ? (
          courses.map((course) => (
            <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
              {course.title}
              <Button variant="danger">Delete</Button>
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

  const handleDetail = (course) => {
    alert(`Detail for course: ${course.title}\nDescription: ${course.description}`);
  };

  return (
    <div>
      <h4>Pending Courses</h4>
      <ul className="list-group">
        {courses.length > 0 ? (
          courses.map((course) => (
            <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
              {course.title}
              <div>
                <Button variant="success" className="mr-2" onClick={() => handleAccept(course.id)}>Accept</Button>
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
