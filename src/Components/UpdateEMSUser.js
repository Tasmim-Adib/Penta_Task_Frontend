
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
        axios({
            url : `http://localhost:8080/admin/update/role/${user_id}`,
            method : "PUT",
            data : payload,
            headers: {
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('Token'),
            },

        }).then(response => {
            if(response){
                setError('Role Updated Successfully')   
            }
            else{
                setError(response.data.error);
            }
        })
        .catch(error => {
            setError(error.message)
        });
    };

    const handleStatusDEACTIVATE = async(e) =>{
        e.preventDefault();
        const payload = {
            userStatus : 'DEACTIVE'
        }
        axios({
            url : `http://localhost:8080/admin/update/status/${user_id}`,
            method : "PUT",
            data : payload,
            headers: {
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('Token'),
            },

        }).then(response => {
            if(response){
                setError('Account Deactivated')
            }
            else{
                setError(response.data.error);
            }
        })
        .catch(error => {
            setError(error.message)
        });
    };

    const handleStatusACTIVATE = async(e) =>{
        e.preventDefault();
        const payload = {
            userStatus : 'ACTIVE'
        }
        axios({
            url : `http://localhost:8080/admin/update/status/${user_id}`,
            method : "PUT",
            data : payload,
            headers: {
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('Token'),
            },

        }).then(response => {
            if(response){
                setError('Account activated')
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