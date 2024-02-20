import React,{useState} from "react";
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

export default function StudentRegister(){

    const [inputValues, setInputValues] = useState({
        department_name: '',
        batch_no: '',
        student_id: '',
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
        const batch = parseInt(inputValues.batch_no)
        const payload = {
            department_name : inputValues.department_name,
            batch_no : batch,
            student_id : inputValues.student_id
        };


        fetch(`http://localhost:8080/student/save/${user_id}`, {
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
                navigate(`/student/${user_id}`);
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
    };
    return(
        <div>
            <h1>Penta Project Task</h1>
            <div className='LoginForm'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="department_name" placeholder='Department Name' value={inputValues.department_name} onChange={handleInputChange}/>
                    <input type="text" name="student_id" placeholder='Student ID' value={inputValues.student_id} onChange={handleInputChange}/>
                    <input type="number" name="batch_no" placeholder='Batch No' value={inputValues.batch_no} onChange={handleInputChange}/>
                    <input type="text" name="phone" placeholder='Phone' value={inputValues.phone} onChange={handleInputChange}/>
                    <button type="submit">Save</button>
                    
                </form>
            </div>
        </div>
    )
}