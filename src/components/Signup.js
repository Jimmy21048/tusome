import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Signup() {
    const history = useNavigate()
    const[data, setData] = useState({
        username: '',
        email: '',
        pwd: '',
        pwd2: ''
    })
    const [error, setError] = useState('')
    const[success,setSuccess] = useState('')

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({...data, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(data.pwd === data.pwd2) {
            axios.post(process.env.REACT_APP_SIGNUP, data, {
                headers : {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if(response.data.success) {
                    setSuccess(response.data.success + " redirecting...")
                    setTimeout(() => {
                        setSuccess('')
                        return history('/login')
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
        } else {
            setError('Passwords do not match')
            setTimeout(() => {
                setError('')
            }, 3000)
        }
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
                <h1 className="title2">SIGN UP</h1>
                <form className="signin-form" onSubmit={handleSubmit}>
                    <label>Username
                        <input type="text" name="username" onChange={(e) => handleChange(e)} />
                    </label>
                    <label>Email
                        <input type="text" name="email" onChange={(e) => handleChange(e)} />
                    </label>
                    <label>Password
                        <input type="password" name="pwd" onChange={(e) => handleChange(e)} />
                    </label>
                    <label>Confirm password
                        <input type="password" name="pwd2" onChange={(e) => handleChange(e)} />
                    </label>
                    <button className="signin-button">Sign Up</button>
                </form>
                <div className="change-sign">Already have an account ? <Link to={'/login'}>login</Link></div>
            </div>
        </div>
    )
}