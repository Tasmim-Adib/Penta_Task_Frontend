import React from "react";
import { useNavigate } from "react-router-dom";

export default function WaitComponent(){
    const navigate = useNavigate();
    
    const handleSubmit = () =>{
        navigate('/');
        
    }


    return(
        <div className="LoginForm">
            <form>
                <h1>Penta Project Task</h1>
                <h4 style={{textAlign : 'center'}}>Please Wait while an admin assign your Role</h4>
                <h4 style={{textAlign : 'center'}}>Try to login after role assignment</h4>
                <button onClick={handleSubmit}>Back To Login</button>
    
            </form>
            
        </div>
    )
}