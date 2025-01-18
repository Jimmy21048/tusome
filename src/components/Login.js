import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

export default function Login() {
    const[data, setData] = useState({
        username: '',
        password: ''
    })
    return (
        <div className="signin">
        <div className="signin-hero">
            <h1 className="title2">LOG IN</h1>
            <form className="signin-form">
                <label>Enter username or email
                    <input type="text" />
                </label>
                <label>Enter password
                    <input type="text" />
                </label>
                <button className="signin-button">Log In</button>
            </form>
            <div className="change-sign">Don't have an account ? <Link to={'/signup'}>signup</Link></div>
        </div> 
        </div>
    )
}