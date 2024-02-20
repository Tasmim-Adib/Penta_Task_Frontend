import React, { useState } from 'react';
import '../CSS/LoginComponent.css';
import { useNavigate } from 'react-router-dom';


export default function LoginComponent(){

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [response, setResponse] = useState(null)

    
    const handleGoogleLogin = async() =>{
        
        try{
            const retrieveUser = await fetch('http://localhost:8080/get/unauthorized',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect : 'follow'
            });
            if(!retrieveUser.ok){
                console.log(retrieveUser)
            }
            if(retrieveUser.redirected){
                document.location = retrieveUser.url;
            }
        }
        catch(error){
            console.log(error.message);
        }

    }

    return(
        <div>
            <h1>Penta Project Task</h1>
            <div className='LoginForm'>
                <button onClick={handleGoogleLogin}>Google Login</button>
            </div>
        </div>
        
    )
}