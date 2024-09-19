import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import CourseList from './Pages/CourseList';
import CourseCreate from './Pages/CourseCreate';
import TeacherDashboard from './Pages/TeacherDashboard';
import SignUp from './Pages/Sign-up';
import './App.css';
import Home from './Pages/Home';


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

      </Routes>
    </Router>
  );
}

export default App;
