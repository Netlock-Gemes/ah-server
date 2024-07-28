# A H Enterprises backend API

A backend API for managing properties and user authentication, using Express.js, MongoDB, and Multer for file uploads. This API allows users to register, log in, manage properties, and express interest in properties.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [File Uploads](#file-uploads)

## Features

- User registration and login
- Admin management of users and properties
- Property creation, update, and deletion
- Image upload for properties
- User interest management

## Tech Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB
- **File Upload**: Multer
- **Authentication**: JWT
- **Environment Variables**: dotenv

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote instance)
- Access to a cloud storage service (optional, for persistent file storage)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Netlock-Gemes/ah-client.git
   cd ah-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root of the project with the following content:

   ```plaintext
   MONGO_URI=mongodb://localhost:27017/ah-enterprises
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Run the application**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:5000`.

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user or admin
- **POST** `/api/auth/login` - Login a user or admin
- **GET** `/api/auth/user` - Get logged-in user's data
- **GET** `/api/auth/users` - Get all users' data (Admin only)
- **PUT** `/api/auth/users/:id/role` - Update a user's role (Admin only)

### Properties

- **POST** `/api/properties/create` - Create a new property (Admin only)
- **GET** `/api/properties/all` - Get all properties
- **GET** `/api/properties/:id` - Get a property by ID
- **PUT** `/api/properties/:id` - Update a property (Admin only)
- **DELETE** `/api/properties/:id` - Delete a property (Admin only)
- **POST** `/api/properties/interest` - Express interest in a property
- **GET** `/api/properties/interested` - Get properties a user is interested in

## File Uploads

Images are uploaded using Multer and stored in the `uploads` directory by default.

### Multer Configuration

- **Destination**: `uploads/`
- **Filename**: `Date.now() + path.extname(file.originalname)`

---
