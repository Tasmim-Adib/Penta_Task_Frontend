import React,{useState} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

export default function TeacherRegistration(){
    const [inputValues, setInputValues] = useState({
        faculty_name: '',
        designation: '',
        phone : ''
    });

    const navigate = useNavigate();
    const {user_id } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const payload = {
            faculty_name : inputValues.faculty_name,
            designation : inputValues.designation
        };

        fetch(`http://localhost:8080/teacher/save/${user_id}`, {
            method: 'POST',
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
                navigate(`/teacher/${user_id}`);
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });

            
            const phoneData = {
                phone : inputValues.phone
            };
    
            fetch(`http://localhost:8080/api/auth/update/phone/${user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(phoneData),
                credentials : 'include'
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    
                })
                .then((data) => {
                    console.log('Data posted successfully:', data);
                    
                })
                .catch((error) => {
                    console.error('Error posting data:', error);
                });
    }

    const handleGoBack = (e) =>{
        e.preventDefault();
        navigate('/');
    }
    return(
        <div>
            <h1>Penta Project Task</h1>
            <div className='LoginForm'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="faculty_name" placeholder='Faculty Name' value={inputValues.faculty_name} onChange={handleInputChange}/>
                    <input type="text" name="designation" placeholder='Designation' value={inputValues.designation} onChange={handleInputChange}/>
                    <input type="text" name="phone" placeholder='Phone' value={inputValues.phone} onChange={handleInputChange}/>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}