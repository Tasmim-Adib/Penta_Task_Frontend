import React , {useState, useEffect}from "react";
import { useParams } from "react-router-dom";
import StudentNav from "./StudentNav";
import StudentDetails from "./StudentDetails";
import axios from "axios";

export default function StudentProfile(){

    const [student, setStudent] = useState(null);
    const { user_id } = useParams();

    useEffect(() => {
        
        const fetchData = async () => {
          try {
            const retrieveStudent = await axios.get(`http://localhost:8080/api/auth/student/get/${user_id}`);
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
            <StudentNav/>
            <StudentDetails student = {student}/>
        </div>
    )
}