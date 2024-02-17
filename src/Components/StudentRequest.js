import React,{useState, useEffect} from "react";
import { useParams,Link } from "react-router-dom";

export default function StudentRequest(){

    const {user_id}  = useParams();
    const [data,setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() =>{
        const fetchData = async() =>{
            if(user_id){
                try{
                    const response = await fetch(`http://localhost:8080/teacher/get/request/${user_id}`,{
                        headers: {
                            'Content-Type' : 'application/json',
                            Authorization: 'Bearer ' + localStorage.getItem('Token'),
                        },
                    });
              
                    const responseData = await response.json();
                    setData(responseData);
                    console.log(data)
                }
                catch(error){
                    console.error('Error fetching data:', error.message);
                    setError(error.message);
                }
            }
            
              
        }
        fetchData();
    }, [user_id])
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
            <table style={{ margin: 'auto' }}>
                <thead>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Faculty Name</td>
                    <td>Designation</td>
                </thead>

                <tbody>
                    {data && Object.keys(data).map((user, index) => (
                        <tr key={index}>
                            <td>{data[user].name}</td>
                            <td>{data[user].email}</td>
                            <td>{data[user].phone}</td>
                            <td>{data[user].faculty_name}</td>
                            <td>{data[user].designatoin}</td>
                            {/* <td><Link to={`/EMSUser/${data[user].user_id}/${data[user].role.role_id}`}><button>View Profile</button></Link></td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}