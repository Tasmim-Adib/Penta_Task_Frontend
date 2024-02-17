import React,{useState, useEffect} from "react";
import { useParams,Link } from "react-router-dom";

export default function TeacherRequests(){
    const {user_id}  = useParams();
    const [data,setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() =>{
        const fetchData = async() =>{
            if(user_id){
                try{
                    const response = await fetch(`http://localhost:8080/student/get/request/advisor/${user_id}`,{
                        headers: {
                            'Content-Type' : 'application/json',
                            Authorization: 'Bearer ' + localStorage.getItem('Token'),
                        },
                    });
              
                    const responseData = await response.json();
                    setData(responseData);
                    
                }
                catch(error){
                    console.error('Error fetching data:', error.message);
                    setError(error.message);
                }
            }
            else{
                setError('User Id Not Found')
            }
              
        }
        fetchData();
    }, [user_id])

    return(
        <div>
            <h1>Penta Project Task</h1>
            <div>
            <ul className="student-nav">
                    <li className="student-nav-list"><Link to={`/teacher/${user_id}`}>Profile</Link></li>
                    <li className="student-nav-list"><Link to={`/teacher/mystudent/${user_id}`}>My Students</Link></li>
                    <li className="student-nav-list"><Link to={`/teacher/myrequest/${user_id}`}>Requests</Link></li>
                </ul>
                <h2 style={{textAlign : 'center'}}>My Requests</h2>
            </div>
            <table style={{ margin: 'auto' }}>
                <thead>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Student ID</td>
                    <td>Department Name</td>
                    <td>Batch No</td>
                    <td>Details</td>
                </thead>

                <tbody>
                    {data && Object.keys(data).map((user, index) => (
                        <tr key={index}>
                            <td>{data[user].name}</td>
                            <td>{data[user].email}</td>
                            <td>{data[user].phone}</td>
                            <td>{data[user].student_id}</td>
                            <td>{data[user].department_name}</td>
                            <td>{data[user].batch_no}</td>
                            <td><Link to={`/teacher/request/${user_id}/${data[user].user_id}`}><button>View Profile</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}