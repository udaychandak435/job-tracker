# Job Tracker Application

A full-stack Job Application Tracking System built with Spring Boot and React.

## Tech Stack

**Backend:** Java 17, Spring Boot 3, Spring Security, JWT, Hibernate/JPA, MySQL, Maven

**Frontend:** React.js, Bootstrap 5, Axios

## Features

- User Registration & Login with JWT Authentication
- Add, View, Delete Job Applications
- Status tracking — Applied, Interview, Offered, Rejected
- Secure REST APIs — role-based access
- Responsive UI with Bootstrap

## Project Structure

```
job-tracker/
├── job-tracker/              # Spring Boot Backend
│   └── src/main/java/
│       ├── controller/       # REST API endpoints
│       ├── entity/           # Database models
│       ├── repository/       # JPA repositories
│       ├── service/          # Business logic
│       ├── security/         # JWT Filter, Security Config
│       └── dto/              # Request/Response objects
└── job-tracker-frontend/     # React Frontend
    └── src/
        ├── pages/            # Login, Register, Dashboard
        └── api/              # Axios config
```

## Setup & Run

**Backend:**
1. Create MySQL database: `CREATE DATABASE job_tracker_db;`
2. Update `application.properties` with your MySQL credentials
3. Run `JobTrackerApplication.java`

**Frontend:**
1. `cd job-tracker-frontend`
2. `npm install`
3. `npm start`

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register user | No |
| POST | /api/auth/login | Login & get token | No |
| GET | /api/jobs | Get my jobs | Yes |
| POST | /api/jobs | Add job | Yes |
| PUT | /api/jobs/{id} | Update job | Yes |
| DELETE | /api/jobs/{id} | Delete job | Yes |