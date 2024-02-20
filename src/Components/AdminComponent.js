import React, {useState, useEffect} from "react";
import '../CSS/AdminComponent.css';
import { Link,useNavigate } from "react-router-dom";

export default function AdminComponent(){

    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const response = await fetch('http://localhost:8080/api/auth/findall',{
                    method : 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials : 'include'
                });
                
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
          
                  const responseData = await response.json();
                  setData(responseData);
            }
            catch(error){
                console.error('Error fetching data:', error.message);
            }
              
        }
        fetchData();
    }, [])
    
    return(
        <div style={{ textAlign: 'center' }}>
            <h1>Penta Project - Admin</h1>
            <h2>EMSUser</h2>
            
            <table style={{ margin: 'auto' }}>
                <thead>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Role</td>
                    <td>Status</td>
                    <td>Update</td>
                </thead>

                <tbody>
                    {data && Object.keys(data).map((user, index) => (
                        <tr key={index}>
                            <td>{data[user].name}</td>
                            <td>{data[user].email}</td>
                            <td>{data[user].phone}</td>
                            <td>{data[user].role ? data[user].role.roleEnum : 'N/A'}</td>
                            <td>{data[user].status}</td>
                            <td><Link to={`/admin/update/${data[user].user_id}`}><button>Update</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>

    )
}