import React, { useState, useEffect } from 'react';
import API from '../api/axios';

function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('Applied');
    const [notes, setNotes] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => { fetchJobs(); }, []);

    const fetchJobs = async () => {
        try {
            const res = await API.get('/api/jobs');
            setJobs(res.data);
        } catch (err) { console.log(err); }
    };

    const addJob = async () => {
        try {
            await API.post('/api/jobs', {
                companyName, role, status, notes, location,
                appliedDate: new Date().toISOString().split('T')[0]
            });
            fetchJobs();
            setCompanyName(''); setRole(''); setNotes(''); setLocation('');
        } catch (err) { console.log(err); }
    };

    const deleteJob = async (id) => {
        await API.delete(`/api/jobs/${id}`);
        fetchJobs();
    };

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const getStatusBadge = (status) => {
        const colors = {
            'Applied': 'primary', 'Interview': 'warning',
            'Offered': 'success', 'Rejected': 'danger'
        };
        return `badge bg-${colors[status] || 'secondary'}`;
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Job Tracker Dashboard</h2>
                <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
            </div>

            <div className="card shadow p-4 mb-4">
                <h5 className="mb-3">Add New Job</h5>
                <div className="row g-2">
                    <div className="col-md-3">
                        <input className="form-control" placeholder="Company"
                            value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" placeholder="Role"
                            value={role} onChange={(e) => setRole(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                        <select className="form-select" value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <option>Applied</option>
                            <option>Interview</option>
                            <option>Offered</option>
                            <option>Rejected</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" placeholder="Notes"
                            value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                        <input className="form-control" placeholder="Location"
                            value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-primary w-100" onClick={addJob}>Add</button>
                    </div>
                </div>
            </div>

            <div className="card shadow">
                <div className="card-header"><h5 className="mb-0">My Applications</h5></div>
                <table className="table table-hover mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>Company</th><th>Role</th>
                            <th>Status</th><th>Notes</th>
                            <th>Location</th><th>Applied Date</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => (
                            <tr key={job.id}>
                                <td>{job.companyName}</td>
                                <td>{job.role}</td>
                                <td><span className={getStatusBadge(job.status)}>{job.status}</span></td>
                                <td>{job.notes}</td>
                                <td>{job.location}</td>
                                <td>{job.appliedDate}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm"
                                        onClick={() => deleteJob(job.id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;