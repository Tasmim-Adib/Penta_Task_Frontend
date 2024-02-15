import React,{useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import StudentDetails from './StudentDetails';
import TeacherDetails from "./TeacherDetails";

const EmsuserDetails = () => {

    const [data, setData] = useState([])
    const { user_id, role_id } = useParams();
    const [responseError, setResponseError] = useState(null);

    useEffect(() =>{
        
        const fetchData = async() =>{
            try{

                let url = '';
                if(role_id === 2){
                    url =  `http://localhost:8080/api/auth/student/get/${user_id}`
                }
                else{
                    url = `http://localhost:8080/api/auth/teacher/get/${user_id}`
                }
                const response = await fetch(url);
                
                
                if (!response.ok) {
                    setResponseError("Error Occured")
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
          
                const responseData = await response.json();
                setData(responseData);
                console.log(data)
            }
            catch(error){
                console.error('Error fetching data:', error.message);
            }
              
        }
        fetchData();
    }, [role_id,user_id])
    
    return(
        <div>
            <h1>Penta Project Task</h1>
            <h2>EMSuser Details</h2>
            
            {role_id === 2 ? (
                
                <StudentDetails data = {data}/>
            ) : (
                <TeacherDetails data = {data}/>
            )}
        </div>
    )
};

export default EmsuserDetails;