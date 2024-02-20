import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import LoginComponent from './Components/LoginComponent'
import AdminComponent from './Components/AdminComponent';
import ConfirmMailComponent from './Components/ConfirmMailComponent';
import WaitComponent from './Components/WaitComponent';
import StudentProfile from './Components/StudentProfile';
import TeacherProfile from './Components/TeacherProfile';
import StudentUpdate from './Components/StudentUpdate';
import StudentRegister from './Components/StudentRegister';
import TeacherRegistration from './Components/TeacherRegistration';
import MailForPasswordReset from './Components/MailForPassworReset';
import ResetPassword from './Components/ResetPassword';
import StudentRequest from './Components/StudentRequest';
import StudentNotRequest from './Components/StudentNotRequest';
import TeacherNotRequested from './Components/TeacherNotRequested';
import TeacherUpdate from './Components/TeacherUpdate';
import TeacherRequests from './Components/TeacherRequests';
import RequestedStudent from './Components/RequestedStudent';
import TeacherStudentList from './Components/TeacherStudentList';
import MyStudent from './Components/MyStudent';
import UpdateEMSUser from './Components/UpdateEMSUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent/>} exact/>
        <Route path='/admin' element={<AdminComponent/>}/>
        <Route path='/confirm/mail/:email' element={<ConfirmMailComponent/>}/>
        <Route path='/wait/until/confirm/role' element={<WaitComponent/>}/>
        <Route path='/student/:user_id' element={<StudentProfile/>}/>
        <Route path='/teacher/:user_id' element={<TeacherProfile/>}/>
        <Route path='/student/update/:user_id' element={<StudentUpdate/>}/>
        <Route path='/register/student/:user_id' element={<StudentRegister/>}/>
        <Route path='/register/teacher/:user_id' element={<TeacherRegistration/>}/>
        <Route path='/confirm/mail/password/reset/:email' element={<MailForPasswordReset/>}/>
        <Route path='/reset/password/:email' element={<ResetPassword/>}/>
        <Route path='/request/:user_id' element={<StudentRequest/>}/>
        <Route path='/available/for/:user_id' element={<StudentNotRequest/>}/>
        <Route path='/teacher/not/requested/:student_user_id/:teacher_user_id' element={<TeacherNotRequested/>}/>
        <Route path='/teacher/update/:user_id' element={<TeacherUpdate/>}/>
        <Route path='/teacher/myrequest/:user_id' element={<TeacherRequests/>}/>
        <Route path='/teacher/mystudent/:user_id' element={<TeacherStudentList/>}/>
        <Route path='/teacher/request/:teacher_user_id/:student_user_id' element={<RequestedStudent/>}/>
        <Route path='/teacher/student/:teacher_user_id/:student_user_id' element={<MyStudent/>}/>
        <Route path='/admin/update/:user_id' element={<UpdateEMSUser/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
