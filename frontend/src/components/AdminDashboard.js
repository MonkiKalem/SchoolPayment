import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <nav>
                <ul>
                    <li><Link to="/manage-users">Manage Users</Link></li>
                    <li><Link to="/manage-payments">Manage Payments</Link></li>
                    <li><Link to="/manage-tahun-masuk">Manage Tahun Masuk</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminDashboard;
