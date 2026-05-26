import React, { useState, useEffect } from 'react';
import API from '../api/axios';

function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('Applied');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await API.get('/api/jobs');
            setJobs(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const addJob = async () => {
        try {
            await API.post('/api/jobs', {
                companyName, role, status, notes,
                appliedDate: new Date().toISOString().split('T')[0]
            });
            fetchJobs();
            setCompanyName(''); setRole(''); setNotes('');
        } catch (err) {
            console.log(err);
        }
    };

    const deleteJob = async (id) => {
        await API.delete(`/api/jobs/${id}`);
        fetchJobs();
    };

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div style={{ padding: '30px' }}>
            <h2>Job Tracker Dashboard</h2>
            <button onClick={logout}>Logout</button>

            <h3>Add New Job</h3>
            <input placeholder="Company" value={companyName}
                onChange={(e) => setCompanyName(e.target.value)} />
            <input placeholder="Role" value={role}
                onChange={(e) => setRole(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offered</option>
                <option>Rejected</option>
            </select>
            <input placeholder="Notes" value={notes}
                onChange={(e) => setNotes(e.target.value)} />
            <button onClick={addJob}>Add Job</button>

            <h3>My Applications</h3>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Company</th><th>Role</th>
                        <th>Status</th><th>Notes</th><th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job.id}>
                            <td>{job.companyName}</td>
                            <td>{job.role}</td>
                            <td>{job.status}</td>
                            <td>{job.notes}</td>
                            <td><button onClick={() => deleteJob(job.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;