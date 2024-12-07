import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AdminDashboard from './AdminDashboard';
import PegawaiDashboard from './PegawaiDashboard';
import SiswaDashboard from './SiswaDashboard';
import Navbar from './Navbar';

function Dashboard() {
    const [role, setRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = jwtDecode(token);
            setRole(decoded.role);
        }
    }, []);

    if (!role) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar role={role} />
            <h1>Welcome to the Dashboard</h1>
            {role === 'admin' && <AdminDashboard />}
            {role === 'pegawai' && <PegawaiDashboard />}
            {role === 'siswa' && <SiswaDashboard />}
        </div>
    );
}

export default Dashboard;
