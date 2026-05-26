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
        <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Register</h2>
            <input placeholder="Username" value={username}
                onChange={(e) => setUsername(e.target.value)} /><br /><br />
            <input placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)} /><br /><br />
            <input placeholder="Password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} /><br /><br />
            <button onClick={handleRegister}>Register</button>
            <p>{message}</p>
            <a href="/">Login here</a>
        </div>
    );
}

export default Register;