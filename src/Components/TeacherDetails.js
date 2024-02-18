import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherDetails = ({teacher}) =>{

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleUpdateProfile = (e) =>{
        e.preventDefault();
        navigate(`/teacher/update/${teacher.user_id}`)
    }

    const handleResetPassword = (e) =>{
        e.preventDefault();
        const payload = {
            receiver : teacher.email,
            subject : 'Request to reset password'
        }
        axios({
            url : 'http://localhost:8080/api/auth/mail',
            method : "POST",
            data : payload
        }).then(response => {
            console.log('Data posted successfully:', response.data);
            navigate(`/confirm/mail/password/reset/${teacher.email}`)
            
        })
        .catch(error => {
            console.error('Error posting data:', error);
            setError(error)
            
        });
    }

    const handleLogout  = (e) =>{
        e.preventDefault();
        localStorage.removeItem('Token');
        navigate('/')
    }
    return(
        <div className="student-Details">            
            {teacher ? (
                <div>
                    <h3>Name : {teacher.name}</h3>
                    <h3>Email : {teacher.email}</h3>
                    <h3>Phone : {teacher.phone}</h3>
                    <h3>Faculty Name : {teacher.faculty_name}</h3>
                    <h3>Designation : {teacher.designation}</h3>
                    <div className="student-details-buton">
                        <button style={{margin : '10px'}} onClick={handleUpdateProfile}>Update Profile</button>
                        <button style={{margin : '10px'}} onClick={handleResetPassword}>Reset Password</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    
                </div>
            ):<h2>Teacher not found</h2>}
            
        </div>
    )
}

export default TeacherDetails;