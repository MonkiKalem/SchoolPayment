import React, { useState, useEffect } from 'react';

function ManagePayments() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetch('/api/payments') // Replace with your API endpoint
            .then(response => response.json())
            .then(data => setPayments(data))
            .catch(error => console.error('Error fetching payments:', error));
    }, []);

    return (
        <div>
            <h2>Manage Payments</h2>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.id}>
                            <td>{payment.user.name}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManagePayments;
