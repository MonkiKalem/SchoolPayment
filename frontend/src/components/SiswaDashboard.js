import React, { useState, useEffect } from 'react';

function SiswaDashboard() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetch('/api/student/payments') // Replace with your API endpoint
            .then(response => response.json())
            .then(data => setPayments(data))
            .catch(error => console.error('Error fetching payments:', error));
    }, []);

    return (
        <div>
            <h2>Siswa Dashboard</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.id}>
                            <td>{payment.date}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SiswaDashboard;
