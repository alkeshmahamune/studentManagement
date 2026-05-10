School Management API

A RESTful API built using Node.js and Express.js for managing school data.
The API allows users to:

Add new schools
Fetch schools sorted by proximity to a user’s location

This project was developed as a backend assignment focusing on API development, database integration, validation, and deployment.

Live API
https://school-management-api-lm8j.onrender.com

GitHub Repository
https://github.com/alkeshmahamune/studentManagement.git

Features
Add School API
List Schools API
Geographical distance sorting
Input validation
RESTful architecture
Environment variable support
Hosted backend deployment

Tech Stack
Technology	Purpose
---------------------------
Node.js	    Backend runtime
Express.js	API framework
SQLite	    Database
Postman	    API testing
Render      Deployment

Project Structure
school-management-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── schoolController.js
│
├── routes/
│   └── schoolRoutes.js
│
├── utils/
│   └── distanceCalculator.js
│
├── app.js
├── package.json
├── schools.db
└── README.md

API Endpoints
1. Add School
Endpoint
POST /addSchool

Request Body
{
  "name": "ABC School",
  "address": "Pune, Maharashtra",
  "latitude": 18.5204,
  "longitude": 73.8567
}

Success Response
{
  "success": true,
  "message": "School added successfully"
}

2. List Schools
Endpoint
GET /listSchools?latitude=18.5204&longitude=73.8567

{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "ABC School",
      "address": "Pune, Maharashtra",
      "latitude": 18.5204,
      "longitude": 73.8567,
      "distance": "0.00 km"
    }
  ]
}

Installation & Setup
Clone Repository
git clone https://github.com/alkeshmahamune/studentManagement.git

Navigate to Project
cd school-management-api

Install Dependencies
npm install

Start Development Server
npm run dev

Environment Variables

Create a .env file:

PORT=5000

Deployment

Backend deployed on:

Render

Postman Testing

APIs were tested using:

Postman

Validation

The API validates:

Empty fields
Missing coordinates
Invalid latitude/longitude values

Notes
The project was initially designed using MySQL as per assignment requirements.
SQLite was used for deployment simplicity and reliable free hosting.
All required API functionality and database operations remain fully implemented.

Future Improvements
JWT Authentication
Swagger API Documentation
Pagination
Search & Filtering
Docker Deployment
Cloud Database Integration

Author

Alkesh Mahamune 

Backend Developer | MERN Stack Developer

GitHub:

https://github.com/alkeshmahamune