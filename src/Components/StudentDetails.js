import React from "react";

const StudentDetails = ({student}) => {
    
    return(
        <div>
            {student ? (
                <div>
                    <h2>Name : {student.name}</h2>
                    <h2>Email : {student.email}</h2>
                    <h2>Phone : {student.phone}</h2>
                    <h2>Department Name : {student.department_name}</h2>
                    <h2>Student Id : {student.student_id}</h2>
                    <h2>Batch No : {student.batch_no}</h2>
                    <h2>Advisor : {student.advisor ? student.advisor : 'N/A'}</h2>
                </div>
            ):<h2>Student not found</h2>}
            
        </div>
    )
}
export default StudentDetails;