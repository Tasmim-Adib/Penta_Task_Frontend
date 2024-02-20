import React , {useState, useEffect}from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import StudentDetails from "./StudentDetails";
import axios from "axios";
import '../CSS/StudentNav.css'
export default function StudentProfile(){

    const [student, setStudent] = useState(null);
    const { user_id } = useParams();

    const navigate = useNavigate();
    useEffect(() => {
        
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/student/get/${user_id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                
              },
              credentials: 'include', 
            });
          
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
          
            const responseData = await response.json();
            setStudent(responseData)
            console.log('Data:', responseData);
          } catch (error) {
            console.error('Error fetching data:', error.message);
            navigate(`/register/student/${user_id}`)
          }
        };
    
        fetchData();
    }, [user_id]);
    
    return(
        <div>
            <h1>Penta Project Task</h1>
            <div>
                <ul className="student-nav">
                    <li className="student-nav-list"><Link to={`/student/${user_id}`}>Profile</Link></li>
                    <li className="student-nav-list"><Link to={`/request/${user_id}`}>You Requested</Link></li>
                    <li className="student-nav-list"><Link to={`/available/for/${user_id}`}>Available Teacher</Link></li>
                </ul>
                
            </div>
            <StudentDetails student = {student}/>
        </div>
    )
}