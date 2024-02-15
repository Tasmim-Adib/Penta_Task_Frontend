import React, { useState,useEffect } from 'react';
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

    const [user, setUser] = useState(null);
    const [student, setStudent] = useState(null);
    const [teacher, setTeacher] = useState(null);

    useEffect(() =>{
        const token = localStorage.getItem('Token');
        if(token){
            const decoded = jwtDecode(token);

        const fetchData = async () => {
            try {
                const retrieveUser = await axios.get(`http://localhost:8080/api/auth/find/${decoded.sub}`);
                const userData = retrieveUser.data;
                setUser(userData);
    
                if(user.role_id === 1){

                }
                else if(user.role_id === 2){
                
                    const retrieveStudent = await axios.get(`http://localhost:8080/api/auth/student/get/${user.user_id}`);
                    const studentData = retrieveStudent.data;
                    setStudent(studentData)
                    
                    student.user_id ? navigate(`/student/${student.user_id}`) : navigate(`/register/student/${student.user_id}`);
                }
                else{
                    const retrieveTeacher = await axios.get(`http://localhost:8080/api/auth/teacher/get/${user.user_id}`)
                    const teacherData = retrieveTeacher.data;
                    setTeacher(teacherData);
                    teacher.user_id ? navigate(`/teacher/${teacher.user_id}`) : navigate(`/register/teacher/${teacher.user_id}`);
                }
              
              
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
          };
          fetchData();
        }
    },[user, student, teacher, navigate])

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
            password : inputValues.password
        };

        axios({
            url : 'http://localhost:8080/api/auth/authenticate',
            method : "POST",
            data : payload

        }).then(response => {
            if(response.data.token){
                localStorage.setItem('Token', response.data.token);
                console.log(response.data.token)
                navigate('/wait/until/confirm/role');
            }
            else{
                setError(response.data.error);
            }
            
            
        })
        .catch(error => {
            
            setError(error.message)
            
        });
    };

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