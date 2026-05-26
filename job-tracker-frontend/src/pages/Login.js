import React, { useState } from 'react';
import API from '../api/axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const res = await API.post('/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            window.location.href = '/dashboard';
        } catch (err) {
            setMessage('Login failed. Check credentials.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Job Tracker</h2>
                        <h5 className="text-center text-muted mb-4">Login</h5>
                        <input className="form-control mb-3" placeholder="Email"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className="form-control mb-3" placeholder="Password"
                            type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <button className="btn btn-primary w-100" onClick={handleLogin}>
                            Login
                        </button>
                        {message && <p className="text-danger mt-2">{message}</p>}
                        <p className="text-center mt-3">
                            <a href="/register">Register here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;