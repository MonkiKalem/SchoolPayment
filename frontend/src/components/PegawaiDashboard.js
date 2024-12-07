import React, { useState } from 'react';

function PegawaiDashboard() {
    const [studentId, setStudentId] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/payments', { // Replace with your API endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, amount }),
        })
            .then(response => response.json())
            .then(data => alert('Payment recorded successfully'))
            .catch(error => console.error('Error recording payment:', error));
    };

    return (
        <div>
            <h2>Pegawai Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Student ID</label>
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                </div>
                <div>
                    <label>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button type="submit">Record Payment</button>
            </form>
        </div>
    );
}

export default PegawaiDashboard;
