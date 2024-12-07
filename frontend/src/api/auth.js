// src/api/auth.js
import axios from 'axios';

const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        return response;
    } catch (error) {
        throw new Error('Invalid credentials');
    }
};

export default {
    login,
};
