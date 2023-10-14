import React, { useState } from 'react'
import baseurl from '../middleware/baseurl';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [err, setError] = useState();
    const navigate = useNavigate();

    const validateEmail = (e) => {
        const emailreg =
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
        if (!e.target.value.match(emailreg))
            setError("Please enter a valid email address!");
        else setError("");
        setEmail(e.target.value);
    };

    const validatePassword = (e) => {
        const passwordreg =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
        if (!e.target.value.match(passwordreg))
            setError(
                "Use 8 or more characters with a mix of letters, numbers & symbols :)"
            );
        else setError("");
        setPassword(e.target.value);
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(username, email, password);
        try{
            const response  = await axios.post(baseurl + "/register", {
                userEmail : email,
                userPassword : password,
                userName : username
            })
            alert("User registered")
            navigate('problems')
        }catch(err){
            console.log(err)
        }

    }
    return (
        <div> 
            <p>LOGIN FORM</p>
            <form onSubmit={handleSubmit} >
                <label>Enter Username : </label>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' type='text' required></input>
                <label>Enter Email : </label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' type='Email' required></input>
                <label>Enter Password : </label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' type='Password'></input>
                <button type='submit' >submit</button>
            </form>
        </div>
    )
}

export default Login