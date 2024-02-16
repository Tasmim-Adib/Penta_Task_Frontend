import React,{useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentUpdate(){
    const [defaultValue, setDefaultValue] = useState(null)
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const {user_id} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response = await axios.get(`http://localhost:8080/api/auth/student/get/${user_id}`);
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
            batch_no : defaultValue.batch_no,
            department_name : defaultValue.department_name,
            student_id : defaultValue.student_id            
        };

        axios({
            url : `http://localhost:8080/api/auth/student/update/${defaultValue.user_id}`,
            method : "PUT",
            data : payload
        }).then(response => {
            console.log('Data Updated successfully:', response.data);
            setResponseMessage(response.data)
        })
        .catch(error => {
            console.error('Error posting data:', error);
            setResponseMessage(error)
        });
    }

    const handleBackToProfile =(e) =>{
        e.preventDefault();
        navigate(`/student/${defaultValue.user_id}`);
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
                    <label>Student ID: <input type="text" name="student_id" value={defaultValue.student_id} onChange={handleInputChange}/></label>
                    <label>Department Name : <input type="text" name="department_name" value={defaultValue.department_name} onChange={handleInputChange}/></label>
                    <label>Batch No : <input type="Number" name="batch_no" value={defaultValue.batch_no} onChange={handleInputChange}/></label>
                    <button type="submit">Update</button>
                    <button style={{marginTop : '10px'}} onClick={handleBackToProfile}>Back To Profile</button>
                    <p>{responseMessage}</p>
                </form>
            </div>
            
        </div>
    )
}