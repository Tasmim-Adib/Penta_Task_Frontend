import React , {useState, useEffect}from "react";
import { useParams, Link } from "react-router-dom";
import StudentDetails from "./StudentDetails";
import axios from "axios";
import '../CSS/StudentNav.css'
export default function StudentProfile(){

    const [student, setStudent] = useState(null);
    const { user_id } = useParams();

    useEffect(() => {
        
        const fetchData = async () => {
          try {
            const retrieveStudent = await axios.get(`http://localhost:8080/student/get/${user_id}`,{
              headers: {
                  'Content-Type' : 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('Token'),
              },
          });
            const studentData = retrieveStudent.data;
            setStudent(studentData)
            
          } catch (error) {
            console.error('Error fetching data:', error.message);
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