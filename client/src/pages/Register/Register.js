import React, {useState} from 'react';
import axios from 'axios';
import {backendUrl} from "../../config";

import {useNavigate} from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/user/register`, {
                username,
                password
            });
            console.log(response.data.message);


            // Navigate to login page after registration
            navigate('/login');
        } catch (error) {
            console.error(error);
            //set the error message
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignUp}>
                <input placeholder="username" type='text' required onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
                <input placeholder="password" type='password' required onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <button type="submit">Sign up</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Register;
