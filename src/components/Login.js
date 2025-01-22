import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

export default function Login() {
    const history = useNavigate()
    const[data, setData] = useState({
        username: '',
        pwd: ''
    })
    const [error, setError] = useState('')
    const[success,setSuccess] = useState('')

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setData({...data, [name]: value})
    }
    axios.defaults.withCredentials = true;
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(process.env.REACT_APP_LOGIN, data, {
            headers: {
                "Content-Type" : "application/json"
            }
        }).then(response => {
            if(response.data.success) {
                setSuccess(response.data.success + " redirecting...")
                setTimeout(() => {
                    setSuccess('')
                    return history('/')
                }, 3000)
            }
            if(response.data.error) {
                setError(response.data.error)
                setTimeout(() => {
                    setError('')
                }, 3000)
            }
        }).catch(err => {
            console.log("Could not complete operation")
        })
    }

    return (
        <div className="signin">
                    {
                error.length > 0 && 
                <div className="msg-box">
                    <p style={{color: 'red'}}>{error}</p>
                    <div style={{backgroundColor: 'rgb(204, 18, 18)'}} className="msg-bar"></div>
                </div>
            }
            {
                success.length > 0 &&
                <div className="msg-box">
                    <p style={{color: 'green'}}>{success}</p>
                    <div style={{backgroundColor: 'green'}} className="msg-bar"></div>
                </div>
            }
        <div className="signin-hero">
            <h1 className="title2">LOG IN</h1>
            <form className="signin-form" onSubmit={handleSubmit}>
                <label>Enter username or email
                    <input type="text" name="username" required onChange={(e) => handleChange(e)} />
                </label>
                <label>Enter password
                    <input type="password" name="pwd" required onChange={(e) => handleChange(e)} />
                </label>
                <button className="signin-button">Log In</button>
            </form>
            <div className="change-sign">Don't have an account ? <Link to={'/signup'}>signup</Link></div>
        </div> 
        </div>
    )
}