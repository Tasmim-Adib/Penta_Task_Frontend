
import React , {useState, useEffect}from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import TeacherDetails from "./TeacherDetails";


export default function TeacherProfile(){
    const [teacher, setTeacher] = useState(null);
    const { user_id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/teacher/get/${user_id}`,{
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
            console.log('Data:', responseData);
            
          } catch (error) {
            console.error('Error fetching data:', error.message);
            navigate(`/register/teacher/${user_id}`)
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
                <h2 style={{textAlign : 'center'}}>My Profile</h2>
            </div>
            <TeacherDetails teacher = {teacher}></TeacherDetails>
        </div>
    )
}