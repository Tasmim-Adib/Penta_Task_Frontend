import React from "react";
import { Link } from 'react-router-dom';

export default function StudentNav(){
    return(
        <div>
            <ul>
                <li><Link to='/student'>Profile</Link></li>
                <li><Link to='/request'>You Requested</Link></li>
                <li><Link to='/available'>Available Teacher</Link></li>
            </ul>
            
        </div>
    )
}