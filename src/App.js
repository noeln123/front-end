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
import ForgotPass from './Pages/ForgotPass';
import CheckPin from './Pages/CheckPin';
import PasswordChangeSuccess from './Pages/PasswordChangeSuccess';

import AccountInfo from './Pages/Profile'
import AdminDashboard from './Pages/AdminDashboard';
import GeneralManagment from './Pages/GeneralManagment';
import CourseManagment from './Pages/CourseManagment';
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
        <Route path="/courseDetail/:id" element={<CourseDetail />} />
        <Route path="/courseVideo" element={<CourseVideo />} />
        <Route path="/cart" element={<ShoppingCard />} />
        <Route path="/teacherInfor" element={<TeacherInfor />} />
        <Route path="/forgotPass" element={<ForgotPass />} />
        <Route path="/checkPin" element={<CheckPin />} />
        <Route path="/password-change-success" element={<PasswordChangeSuccess />} />

        <Route path="/accountInfor" element={<AccountInfo />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="general-management" element={<GeneralManagment />} />
          <Route path="course-management" element={<CourseManagment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
