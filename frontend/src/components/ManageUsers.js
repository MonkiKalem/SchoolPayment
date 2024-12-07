import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageUsers() {
    const [selectedRole, setSelectedRole] = useState('siswa'); // Default role is siswa
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: selectedRole });

    // Fetch users based on the selected role
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/${selectedRole}`); // Endpoint for users based on role
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [selectedRole]);

    const handleAddUser = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/users', newUser);
            setUsers([...users, response.data]); // Add new user to the table
            setNewUser({ name: '', email: '', role: selectedRole }); // Clear input fields
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id)); // Remove the user from the table
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = async (id) => {
        // Here you would implement the logic to open a modal or edit form
        alert('Edit user functionality is not implemented yet.');
    };

    return (
        <div>
            <h2>Manage Users</h2>
            {/* Dropdown for role selection */}
            <label htmlFor="role">Select Role: </label>
            <select id="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                <option value="siswa">Siswa</option>
                <option value="pegawai">Pegawai</option>
                <option value="admin">Admin</option>
            </select>

            {/* Table showing users */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleEditUser(user.id)}>Edit</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form to add new user */}
            <div>
                <h3>Add New User</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
                    <input 
                        type="text" 
                        value={newUser.name} 
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} 
                        placeholder="Name" 
                        required 
                    />
                    <input 
                        type="email" 
                        value={newUser.email} 
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
                        placeholder="Email" 
                        required 
                    />
                    {/* Role is automatically set based on dropdown */}
                    <button type="submit">Add User</button>
                </form>
            </div>
        </div>
    );
}

export default ManageUsers;
