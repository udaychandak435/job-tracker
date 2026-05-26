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
            setMessage('Login successful!');
            window.location.href = '/dashboard';
        } catch (err) {
            setMessage('Login failed. Check credentials.');
        }
    };

    return (
        <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Login</h2>
            <input placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)} /><br /><br />
            <input placeholder="Password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} /><br /><br />
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
            <a href="/register">Register here</a>
        </div>
    );
}

export default Login;