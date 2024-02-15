import React, {useState} from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function RegistryComponent(){
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });

    const navigate = useNavigate();

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
            email : inputValues.email,
            password : inputValues.password,
            name : inputValues.name,
            phone : inputValues.phone 
        };

        axios({
            url : 'http://localhost:8080/api/auth/temp/save',
            method : "POST",
            data : payload
        }).then(response => {
            console.log('Data posted successfully:', response.data);
            navigate(`/confirm/mail/${inputValues.email}`);
            
        })
        .catch(error => {
            console.error('Error posting data:', error);
            
        });
    };
    
    return(
        <div>
            <h1>Penta Project Task</h1>
            <div className='LoginForm'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder='Name' value={inputValues.name} onChange={handleInputChange}/>
                    <input type="text" name="email" placeholder='Email' value={inputValues.email} onChange={handleInputChange}/>
                    <input type="text" name="phone" placeholder='Phone' value={inputValues.phone} onChange={handleInputChange}/>
                    <input type="password" name="password" placeholder='Password' value={inputValues.password} onChange={handleInputChange}/>
                    <button type="submit">Register</button>
                    <p>Already Have an Account ? <a href='/'>Login</a></p>
                </form>
            </div>
        </div>
    )
}