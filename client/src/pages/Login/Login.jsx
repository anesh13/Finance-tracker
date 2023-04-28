import {useState} from 'react';
import axios from 'axios';
import {backendUrl} from "../../config";

import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/user/login`, {
                username,
                password
            });
            // console.log(response.data);

            // Navigate to home page
            navigate('/login');
        } catch (error) {
            console.error(error);
            //set the error message
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input placeholder="username" type='text' required onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
                <input placeholder="password" type='password' required onChange={(e) => {
                    setPassword(e.target.value);
                }}/>

                <button type="submit">

                    Login
                </button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default Login;
