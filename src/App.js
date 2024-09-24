import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import CourseList from './Pages/CourseList';
import CourseCreate from './Pages/CourseCreate';
import MyCourse from './Pages/MyCourse';
import TeacherDashboard from './Pages/TeacherDashboard';
import SignUp from './Pages/Sign-up';
import './App.css';
import Home from './Pages/Home';
import CourseDetail from './Pages/Course_Details'
import CourseVideo from './Pages/Video_Course';
import ShoppingCard from './Pages/ShoppingCard'
import TeacherInfor from './Pages/TeacherInfor'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/" element={<Home />} />
        <Route path="/teacher/course/create" element={<CourseCreate />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mycourse" element={<MyCourse />} />
        <Route path="/courseDetail" element={<CourseDetail />} />
        <Route path="/courseVideo" element={<CourseVideo />} />
        <Route path="/cart" element={<ShoppingCard />} />
        <Route path="/teacherInfor" element={<TeacherInfor />} />

      </Routes>
    </Router>
  );
}

export default App;
