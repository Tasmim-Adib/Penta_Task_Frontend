import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RequestedStudent(){
    const [student, setStudent] = useState(null);
    const {teacher_user_id, student_user_id} = useParams();
    const [error, setError] = useState('');
    useEffect(() => {
        
        const fetchData = async () => {
            if(student_user_id){
                try {
                    const retrieveStudent = await axios.get(`http://localhost:8080/api/auth/student/get/${student_user_id}`);
                    const studentData = retrieveStudent.data;
                    setStudent(studentData)
                    
                } catch (error) {
                    console.error('Error fetching data:', error.message);
                    setError(error.message);
                }
                
            }
            else{
                setError("Student Not Found");
            }
          
        }    
        fetchData();
    }, [student_user_id]);

    const handleAccept = (e) =>{
        e.preventDefault();
        const payload = {
            advisor : teacher_user_id
        }
        axios({
            url : `http://localhost:8080/api/auth/student/update/advisor/${student_user_id}`,
            method : "PUT",
            data : payload
        }).then(response => {
            console.log('Data posted successfully:', response.data);
            setError('Added in your list')
            
        })
        .catch(error => {
            console.error('Error posting data:', error);
            setError(error)
            
        });
    }

    const handleDismiss = (e) =>{
        e.preventDefault();

        const payload = {
            student_user_id : student_user_id

        }

        axios({
            url : `http://localhost:8080/api/auth/studTeacherReq/delete/${teacher_user_id}`,
            method : "DELETE",
            data : payload
        }).then(response => {
            console.log('Request Deleted successfully:', response.data);
            setError('Delete From your Requested list')
            
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
                    <h2>Student's Profile</h2>
                    <h3>Name : {student.name}</h3>
                    <h3>Email : {student.email}</h3>
                    <h3>Phone : {student.phone}</h3>
                    <h3>Department Name : {student.department_name}</h3>
                    <h3>Student ID : {student.student_id}</h3>
                    <h3>Batch No : {student.batch_no}</h3>
                    <div className="student-details-buton">
                        <button style={{margin : '10px'}} onClick={handleAccept}>Accept</button>
                        <button style={{margin : '10px'}} onClick={handleDismiss}>Dismiss</button>
                    </div>
                    <p>{error}</p>
                </div>
            ):<h2>Teacher not found</h2>}
            
        </div>
    )
}