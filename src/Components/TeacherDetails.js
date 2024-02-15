import React from "react";

export default function TeacherDetails(props){
    return(
        <div>
            <h2>Name : {props.name}</h2>
            <h2>Email : {props.email}</h2>
            <h2>Phone : {props.phone}</h2>
            <h2>Faculty Name : {props.faculty_name}</h2>
            <h2>Designation : {props.designation}</h2>
        </div>
    )
}