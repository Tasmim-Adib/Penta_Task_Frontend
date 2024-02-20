import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../CSS/TeacherDetails.css';

export default function TeacherNotRequested(){
    const [teacher, setTeacher] = useState(null);
    const {student_user_id, teacher_user_id} = useParams();
    const [error, setError] = useState('');
    useEffect(() => {
        
        const fetchData = async () => {
            if(teacher_user_id){
                try {
                    const response = await fetch(`http://localhost:8080/teacher/get/${teacher_user_id}`,{
                        method : 'GET',
                        headers: {
                            'Content-Type' : 'application/json',
                            
                        },
                        credentials : 'include'
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                      }

                      const responseData = await response.json();

                    setTeacher(responseData)
                    
                } catch (error) {
                    console.error('Error fetching data:', error.message);
                    setError(error.message);
                }
                
            }
            else{
                setError("Teacher Not Found");
            }
          
        }    
        fetchData();
    }, [teacher_user_id]);

    const handleSendRequest = (e) =>{
        e.preventDefault();

        const payload = {
            student_user_id : student_user_id,
            teacher_user_id : teacher_user_id
        }

        fetch('http://localhost:8080/studTeacherReq/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            credentials : 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
            })
            .then((data) => {
                console.log('Data posted successfully:', data);
                setError("Request Sent")
            })
            .catch((error) => {
                console.error('Error posting data:', error);
                setError(error.message)
            });
    }
    return(
        <div className="Teacher-Details">
            {teacher ? (
                <div>
                    <h1>Penta Project Task</h1>
                    <h2>Teacher Profile</h2>
                    <h4>Name : {teacher.name}</h4>
                    <h4>Email : {teacher.email}</h4>
                    <h4>Phone : {teacher.phone}</h4>
                    <h4>Faculty Name : {teacher.faculty_name}</h4>
                    <h4>Designation: {teacher.designation}</h4>
                    <button style={{margin : '10px'}} onClick={handleSendRequest}>Send Request</button>
                    <p>{error}</p>
                </div>
                
            ):<h2>Teacher not found</h2>}
            
        </div>
    )
}