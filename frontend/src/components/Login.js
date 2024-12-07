// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            console.log(response.data); // Log the response
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                navigate('/dashboard'); // Navigate to dashboard using useNavigate
            }
        } catch (err) {
            console.error(err); // Log the error
            setError('Invalid credentials');
        }
    };
    

    return (
        <div>
            <h2>Login</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
