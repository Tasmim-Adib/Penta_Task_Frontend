import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import LoginComponent from './Components/LoginComponent'
import RegistryComponent from './Components/RegistyComponent';
import AdminComponent from './Components/AdminComponent';
import ConfirmMailComponent from './Components/ConfirmMailComponent';
import WaitComponent from './Components/WaitComponent';
import StudentProfile from './Components/StudentProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent/>} exact/>
        <Route path='/register' element={<RegistryComponent/>}/>
        <Route path='/admin' element={<AdminComponent/>}/>
        <Route path='/confirm/mail/:email' element={<ConfirmMailComponent/>}/>
        <Route path='/wait/until/confirm/role' element={<WaitComponent/>}/>
        <Route path='/student/:user_id' element={<StudentProfile/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
