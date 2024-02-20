
import React,{useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateEMSUser(){

    const {user_id} = useParams();
    const [error, setError] = useState('');
    const [inputValues, setInputValues] = useState({
        role: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    };
    
    const handleRoleUpdate = async(e) =>{
        e.preventDefault();
        const roleId = parseInt(inputValues.role);

        const payload = {
            role_id : roleId
        }

        fetch(`http://localhost:8080/admin/update/role/${user_id}`, {
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
                setError('Role Updated Successfully')
            })
            .catch((error) => {
                console.error('Error posting data:', error);
                setError(error)
            });
    };

    const handleStatusDEACTIVATE = async(e) =>{
        e.preventDefault();
        const payload = {
            userStatus : 'DEACTIVE'
        }

        fetch(`http://localhost:8080/admin/update/status/${user_id}`, {
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
                setError('Account Deactivated')
            })
            .catch((error) => {
                console.error('Error posting data:', error);
                setError(error)
            });
        
    };

    const handleStatusACTIVATE = async(e) =>{
        e.preventDefault();
        const payload = {
            userStatus : 'ACTIVE'
        }

        fetch(`http://localhost:8080/admin/update/status/${user_id}`, {
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
                setError('Account activated')
            })
            .catch((error) => {
                console.error('Error posting data:', error);
                setError(error)
            });
        
    };

    return(
        <div>
            <h1>Penta Project Task</h1>
            <div className='LoginForm'>
                <form>
                    <input type="number" name="role" placeholder='Set Role' value={inputValues.role} onChange={handleInputChange}/>
                    <button onClick={handleRoleUpdate}>Set Role</button>
                    
                    <p>OR</p>
                    <button style={{marginBottom : '10px'}} onClick={handleStatusACTIVATE}>ACTIVATE</button>
                    <button onClick={handleStatusDEACTIVATE}>DEACTIVATE</button>
                    <p style={{color : 'red'}}>{error}</p>
                </form>
            </div>
        </div>
    )
}