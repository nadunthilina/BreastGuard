# Breast Cancer Detection Server

This server provides a backend API for the Breast Cancer Detection system using MongoDB Atlas and Node.js.

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB Atlas**: Cloud database service
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing

## Project Structure

```
server/
├── controllers/        # Request handlers
│   ├── userController.js
│   └── detectionController.js
├── middleware/         # Custom middleware
│   └── authMiddleware.js
├── models/             # Database models
│   ├── userModel.js
│   └── detectionModel.js
├── routes/             # API routes
│   ├── userRoutes.js
│   └── detectionRoutes.js
├── .env                # Environment variables
├── package.json        # Project metadata and dependencies
└── server.js           # Main application entry point
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=mongodb+srv://yunera:yunera@medi@cluster-yunera.pxuizhk.mongodb.net/breastCancerDB
   PORT=5000
   JWT_SECRET=breast_cancer_detection_jwt_secret_2025
   MODEL_SERVICE_URL=http://localhost:5000
   ```

3. Start the server:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (requires authentication)

### Detection

- `POST /api/detection` - Process breast cancer detection (requires authentication)
- `GET /api/detection/history` - Get detection history (requires authentication)
- `GET /api/detection/:id` - Get specific detection result (requires authentication)

## Authentication

All protected routes require a valid JWT token in the header:

```
Authorization: Bearer <token>
```
