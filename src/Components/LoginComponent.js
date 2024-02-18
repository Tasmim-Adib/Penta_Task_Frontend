import React, { useState } from 'react';
import '../CSS/LoginComponent.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from "jwt-decode"

export default function LoginComponent(){

    const navigate = useNavigate();
    
    const [error, setError] = useState('');
    const [inputValues, setInputValues] = useState({
        email: '',
        password: ''
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const payload = {
            email : inputValues.email,
            password : inputValues.password
        };

        try{
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', payload);
            if(response.data.token){
                localStorage.setItem('Token',response.data.token)

                const decodedToken = jwtDecode(response.data.token);

                
                const getUserDataResponse = await axios.get(`http://localhost:8080/api/auth/find/${decodedToken.sub}`);

                
                if(getUserDataResponse.data.role_id === 1){
                    navigate('/admin')
                }

                else if(getUserDataResponse.data.role_id === 2){
                    try{
                        const getStudent = await axios.get(`http://localhost:8080/student/get/${getUserDataResponse.data.user_id}`,{
                            headers:{
                                Authorization : 'Bearer ' + localStorage.getItem('Token')
                            }
                        })
                        console.log(getStudent)
                        if(getStudent.data.student_id){
                            navigate(`/student/${getUserDataResponse.data.user_id}`);
                        }
                        else{
                            navigate(`/register/student/${getUserDataResponse.data.user_id}`);
                        }
                    }
                    catch(error){
                        navigate(`/register/student/${getUserDataResponse.data.user_id}`);
                        setError(error.message);
                    }
                }
                else{
                    try{
                        const getTeacher = await axios.get(`http://localhost:8080/teacher/get/${getUserDataResponse.data.user_id}`,{
                            headers : {
                                Authorization : 'Bearer ' + localStorage.getItem('Token')
                            }
                        })
                        if(getTeacher.data.designation){
                            navigate(`/teacher/${getUserDataResponse.data.user_id}`);
                        }
                        else{
                            navigate(`/register/teacher/${getUserDataResponse.data.user_id}`);
                        }
                    }
                    catch(error){
                        navigate(`/register/teacher/${getUserDataResponse.data.user_id}`);
                        setError(error.message);
                    }
                }
            }
            else{
                setError('response.data.error');
            }
        }
        catch(error){

        }
    }
    

    return(
        <div>
            <h1>Penta Project Task</h1>
            <div className='LoginForm'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="email" placeholder='Email' value={inputValues.email} onChange={handleInputChange}/>
                    <input type="password" name="password" placeholder='Password' value={inputValues.password} onChange={handleInputChange}/>
                    <button type="submit">Log in</button>
                    <p>Don't have an account ? <a href='/register'>Register</a></p>
                    <p style={{color : 'red'}}>{error}</p>
                </form>
            </div>
            
        </div>
    )
}