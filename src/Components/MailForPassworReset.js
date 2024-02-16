import React,{useState, useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function MailForPasswordReset(){

    const { email } = useParams();
    const [data, setData] = useState(null);
    const [retrieveCode, setRetrieveCode] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const retrieveCodeResponse = await axios.get(`http://localhost:8080/api/auth/mail/retrieve/key/${email}`);
                const retrieveCodeResponseData = retrieveCodeResponse.data;
                setRetrieveCode(retrieveCodeResponseData);
                
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
    
        fetchData();
    }, [email]);


    const [inputValues, setInputValues] = useState({
        code : ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    };

    const handleDelete = async () =>{
        try{
            const response = await axios.delete(`http://localhost:8080/api/auth/mail/delete/${email}`)
            console.log("email deleted");
        }
        catch(error){
            console.log(error)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const codeInInt = parseInt(inputValues.code)
        if(codeInInt === retrieveCode.key){
            handleDelete();
            navigate(`/reset/password/${email}`);
        }
        else{
            setError('Code is not matched');
        }
        
    };
    return(
        <div>
            <h1>Penta Project Task</h1>
            <h3 style={{textAlign : 'center'}}>A code has been sent to your mail. Please give the code</h3>
            
            <div className='LoginForm'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="code" placeholder='Enter the code' value={inputValues.code} onChange={handleInputChange}/>
                    <button type="submit">Confirm</button>
                    <p style={{color : 'red'}}>{error}</p>
                </form>
            </div>
            
        </div>
    )
}