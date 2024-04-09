# Backend Course Enrollment Aeonaxy

This is the backend for the Course Enrollment application of Aeonaxy.

## Introduction

The Backend Course Enrollment Aeonaxy is a service designed to handle user registration, authentication, course enrollment, profile management, and other related functionalities for the Aeonaxy Course Enrollment system.

## Features

- User registration with email verification
- User authentication with JWT tokens
- Profile management (update profile picture, update profile details)
- Course enrollment for users
- Course management (accessible only to super users)

## Installation

To install and run the backend locally, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up your environment variables by creating a `.env` file and adding the necessary configurations.
4. Start the server using `npm start`.

## Usage

Once the server is running, you can use the provided API endpoints to interact with the system. Refer to the API Endpoints section for detailed information.

## API Endpoints

- `/upload-profile-dp`: Uploads a profile picture for a user.
- `/register`: Registers a new user.
- `/get-verified`: Gets verified after registration.
- `/create-user`: Creates a user after verification.
- `/login`: Logs a user into the system.
- `/profile`: Fetches user profile information.
- `/get-courses`: Fetches courses based on filters.
- `/enroll-course`: Enrolls a user in a course.
- `/my-enrolled-courses`: Fetches courses enrolled by a user.
- `/profile-update`: Updates user profile information.
- `/super-user-login`: Logs a super user into the system.
- `/read-courses`: Fetches courses (accessible only to super user).
- `/create-course`: Creates a new course (accessible only to super user).
- `/update-course`: Updates a course (accessible only to super user).
- `/delete-course`: Deletes a course (accessible only to super user).

## Environment Variables

Ensure to set the following environment variables:

- `PGHOST`: PostgreSQL host
- `PGDATABASE`: PostgreSQL database name
- `PGUSER`: PostgreSQL username
- `PGPASSWORD`: PostgreSQL password
- `ENDPOINT_ID`: Endpoint ID
- `CLOUD_NAME`: Cloudinary cloud name
- `API_KEY`: Cloudinary API key
- `API_SECRET`: Cloudinary API secret
- `MY_SECRET_TOKEN`: JWT secret token
- Other necessary variables...

## Technologies Used

- Express.js
- Node.js
- Crypto
- Multer
- Cloudinary
- PostgreSQL
- Bcrypt
- Nodemailer
- JSON Web Token (JWT)
