import React, { useState } from "react";
import '../CSS/StudentDetails.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentDetails = ({student}) => {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const handleUpdateProfile = (e) =>{
        e.preventDefault();
        navigate(`/student/update/${student.user_id}`)
    }

    const handleResetPassword = (e) =>{
        e.preventDefault();
        const payload = {
            receiver : student.email,
            subject : 'Request to reset password'
        }
        axios({
            url : 'http://localhost:8080/api/auth/mail',
            method : "POST",
            data : payload
        }).then(response => {
            console.log('Data posted successfully:', response.data);
            navigate(`/confirm/mail/password/reset/${student.email}`)
            
        })
        .catch(error => {
            console.error('Error posting data:', error);
            setError(error)
            
        });
    }

    return(
        <div className="student-Details">
            {student ? (
                <div>
                    <h2>Student Profile</h2>
                    <h4>Name : {student.name}</h4>
                    <h4>Email : {student.email}</h4>
                    <h4>Phone : {student.phone}</h4>
                    <h4>Department Name : {student.department_name}</h4>
                    <h4>Student Id : {student.student_id}</h4>
                    <h4>Batch No : {student.batch_no}</h4>
                    <h4>Advisor : {student.advisor ? student.advisor : 'N/A'}</h4>
                    <div className="student-details-buton">
                        <button style={{margin : '10px'}} onClick={handleUpdateProfile}>Update Profile</button>
                        <button style={{margin : '10px'}} onClick={handleResetPassword}>Reset Password</button>
                        
                    </div>
                    
                </div>
                
            ):<h2>Student not found</h2>}
            
        </div>
    )
}
export default StudentDetails;