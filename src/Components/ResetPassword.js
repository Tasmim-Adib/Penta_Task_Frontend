import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";


export default function ResetPassword(){

    const {email} = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
        password : ''
    });

    useEffect(() => {
        
        const fetchData = async () => {
            if(email){
                try {
                    const response = await fetch(`http://localhost:8080/api/auth/find/${email}`,{
                        method : 'GET',
                        headers : {
                            'Content-type' : 'application/json'
                        },
                        credentials : 'include'
                    });
                    const responseData = response.data;
                    setUser(responseData);
                    
                  } catch (error) {
                    console.error('Error fetching data:', error.message);
                    setError(error.message)
                }
            }
            else{
                setError('Email not found');
            }
          
        };
    
        fetchData();
    }, [email]);

    const handleSubmit = (e) =>{
        e.preventDefault();
    
        const payload = {
            email : email,
            password : inputValues.password,
        };

        fetch(`http://localhost:8080/api/auth/reset/password/${email}`, {
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
            setError('Password Reset Successful');
            
        })
        .catch((error) => {
            console.error('Error posting data:', error);
            setError(error.message)
        });
        
    }

    const handleBackToLogin = (e) =>{
        e.preventDefault();
        navigate('/');
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    };

    return(
        <div>
            <h1>Penta Project Task</h1>
            
            <h3 style={{textAlign : 'center'}}>Reset Your Password</h3>
            
            <div className='LoginForm'>
                <form onSubmit={handleSubmit}>
                    <input type="password" name="password" placeholder='New Password' value={inputValues.password} onChange={handleInputChange}/>
                    <button type="submit">Submit</button>
                    <p style={{color : 'red'}}>{error}</p>
                    <button onClick={handleBackToLogin}>Back To Login</button>
                </form>
            </div>

        </div>
    )
}