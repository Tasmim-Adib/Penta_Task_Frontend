import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";

export default function MyStudent(){
    const [student, setStudent] = useState(null);
    const {teacher_user_id, student_user_id} = useParams();
    const [error, setError] = useState('');
    useEffect(() => {
        
        const fetchData = async () => {
            if(student_user_id){
                try {
                    const response = await fetch(`http://localhost:8080/student/get/${student_user_id}`,{
                        method : 'GET',
                        headers : {
                            'Content-Type': 'application/json',
                        },
                        credentials : 'include'
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                      }
                    const studentData = await response.json();
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


    const handleRemoveStudent = (e) =>{
        e.preventDefault();

        fetch(`http://localhost:8080/student/remove/advisor/${student_user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials : 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
            })
            .then((data) => {
                console.log('Data posted successfully:', data);
                setError('Removed from your list')
            })
            .catch((error) => {
                console.error('Error posting data:', error);
                setError(error)
            });
    
        
    }

    return(
        <div className="student-Details">   
            
            {student ? (
                <div>
                    <h1>Penta Project Task</h1>
                    <h2>Student's Profile</h2>
                    <h3>Name : {student.name}</h3>
                    <h3>Email : {student.email}</h3>
                    <h3>Phone : {student.phone}</h3>
                    <h3>Department Name : {student.department_name}</h3>
                    <h3>Student ID : {student.student_id}</h3>
                    <h3>Batch No : {student.batch_no}</h3>
                    <button style={{margin : '10px'}} onClick={handleRemoveStudent}>Remove</button>
                    <p>{error}</p>
                </div>
            ):<h2>Student not found</h2>}
            
        </div>
    )
}