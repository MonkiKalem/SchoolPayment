import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ManageUsers from './components/ManageUsers';
import ManagePayments from './components/ManagePayments';
import ManageTahunMasuk from './components/ManageTahunMasuk';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin', 'pegawai', 'siswa']} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Admin-only routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-payments" element={<ManagePayments />} />
        <Route path="/manage-tahun-masuk" element={<ManageTahunMasuk />} />
      </Route>
    </Routes>
  );
}

export default App;
