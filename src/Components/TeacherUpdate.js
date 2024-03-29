import React,{useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function TeacherUpdate(){
    const [defaultValue, setDefaultValue] = useState(null)
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const {user_id} = useParams();
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
                const data = response.data;
                setDefaultValue(data);
                
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
    
        fetchData();
      }, [user_id]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDefaultValue((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        const payload = {
            name : defaultValue.name,
            phone : defaultValue.phone,
            faculty_name : defaultValue.faculty_name,
            designation : defaultValue.designation           
        };

        fetch(`http://localhost:8080/teacher/update/${defaultValue.user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            credentials : 'include'
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
        })
        .then((data) => {
            console.log('Data posted successfully:', data);
            setResponseMessage('Updated Successfully')
            
        })
        .catch((error) => {
            console.error('Error posting data:', error);
            setResponseMessage(error.message)
        });
        
    }

    const handleBackToProfile =(e) =>{
        e.preventDefault();
        navigate(`/teacher/${defaultValue.user_id}`);
    }
    if(!defaultValue){
        return(
            <div>Loading....</div>
        )
    }
    return(
        <div>
            <h1>Penta Project Task</h1>
            <h2 style={{textAlign:'center'}}>Student Update</h2>
            <div className="LoginForm">
                <form onSubmit={handleSubmit}>
                    <label>Name : <input type="text" name="name" value={defaultValue.name} onChange={handleInputChange}/></label>
                    <label>Phone : <input type="text" name="phone" value={defaultValue.phone} onChange={handleInputChange}/></label>
                    <label>Faculty Name :<input type="text" name="faculty_name" value={defaultValue.faculty_name} onChange={handleInputChange}/> </label>
                    <label>Designation : <input type="text" name="designation" value={defaultValue.designation} onChange={handleInputChange}/> </label>
                    <button type="submit">Update</button>
                    <button style={{marginTop : '10px'}} onClick={handleBackToProfile}>Back To Profile</button>
                    <p>{responseMessage}</p>
                </form>
            </div>
            
        </div>
    )
}