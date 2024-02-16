
import React , {useState, useEffect}from "react";
import { useParams,Link } from "react-router-dom";
import TeacherDetails from "./TeacherDetails";
import axios from "axios";

export default function TeacherProfile(){
    const [teacher, setTeacher] = useState(null);
    const { user_id } = useParams();

    useEffect(() => {
        
        const fetchData = async () => {
          try {
            const retrieveTeacher = await axios.get(`http://localhost:8080/api/auth/teacher/get/${user_id}`);
            const teacherData = retrieveTeacher.data;
            setTeacher(teacherData)
            
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
                    <li className="student-nav-list"><Link to={`/teacher/${user_id}`}>Profile</Link></li>
                    <li className="student-nav-list"><Link to={`/teacher/mystudent/${user_id}`}>My Students</Link></li>
                    <li className="student-nav-list"><Link to={`/teacher/myrequest/${user_id}`}>Requests</Link></li>
                </ul>
                
            </div>
            <TeacherDetails teacher = {teacher}></TeacherDetails>
        </div>
    )
}