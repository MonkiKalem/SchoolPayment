// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    console.log("Home component is rendered");
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is a public page accessible by anyone.</p>
            <Link to="/login">Go to Login</Link>
            <Link to="/dashboard">Go to Dashboard</Link>
        </div>
    );
}

export default Home;
