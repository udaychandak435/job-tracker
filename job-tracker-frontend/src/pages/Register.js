import React, { useState } from 'react';
import API from '../api/axios';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const res = await API.post('/api/auth/register', { username, email, password });
            setMessage(res.data.message);
            window.location.href = '/';
        } catch (err) {
            setMessage('Registration failed.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Job Tracker</h2>
                        <h5 className="text-center text-muted mb-4">Register</h5>
                        <input className="form-control mb-3" placeholder="Username"
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input className="form-control mb-3" placeholder="Email"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className="form-control mb-3" placeholder="Password"
                            type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <button className="btn btn-success w-100" onClick={handleRegister}>
                            Register
                        </button>
                        {message && <p className="text-success mt-2">{message}</p>}
                        <p className="text-center mt-3">
                            <a href="/">Login here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;