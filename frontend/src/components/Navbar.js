import React from 'react';

function Navbar({ role }) {
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    };
    return (
        <nav>
            <ul>
                {role === 'admin' && (
                    <>
                        <li><a href="/manage-users">Manage Users</a></li>
                        <li><a href="/manage-payments">Manage Payments</a></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
                {role === 'pegawai' && (
                    <>
                        <li><a href="/record-payments">Record Payments</a></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
                {role === 'siswa' && (
                    <>
                        <li><a href="/view-payments">View Payments</a></li>
                        <li><a href="/pay-online">Pay Online</a></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
