import React, { useState, useEffect } from 'react';

function ManageTahunMasuk() {
    const [tahunMasuk, setTahunMasuk] = useState([]);

    useEffect(() => {
        fetch('/api/tahun-masuk') // Replace with your API endpoint
            .then(response => response.json())
            .then(data => setTahunMasuk(data))
            .catch(error => console.error('Error fetching Tahun Masuk:', error));
    }, []);

    return (
        <div>
            <h2>Manage Tahun Masuk</h2>
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {tahunMasuk.map(tahun => (
                        <tr key={tahun.id}>
                            <td>{tahun.year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageTahunMasuk;
