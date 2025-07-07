# Breast Guard - Breast Cancer Detection System

Breast Guard is an advanced system for breast cancer detection using deep learning on ultrasound images. This project is developed by Team Cipher.

## Project Structure

- `frontend/` - React frontend application
- `server/` - Node.js MongoDB backend server
- `model_service/` - Python Flask AI model service

## Prerequisites

- Node.js and npm
- Python 3.8 or higher
- MongoDB Atlas account (connection string provided)

## Setup Instructions

### 1. Backend Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create or verify the `.env` file with your MongoDB connection information:
   ```
   MONGODB_URI=mongodb+srv://yunera:yunera@medi@cluster-yunera.pxuizhk.mongodb.net/breastCancerDB
   PORT=5000
   JWT_SECRET=breast_cancer_detection_jwt_secret_2025
   MODEL_SERVICE_URL=http://localhost:5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

5. The server will start on:
   - http://localhost:4000

### 2. AI Model Service Setup

1. Navigate to the model service directory:
   ```bash
   cd model_service
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask service:
   ```bash
   python app.py
   ```

4. The AI model service will start on:
   - http://localhost:5000

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Access the frontend at:
   - http://localhost:5173

## Features

- User registration and authentication
- Upload and analysis of breast ultrasound images
- Detection of benign or malignant tumors
- Result history tracking by user
- Educational resources about breast cancer

## Technical Details

- MongoDB Atlas for database storage
- Node.js and Express for backend API
- CNN-LSTM Integration for image feature extraction and detection
- Super Pixel Segmentation for enhanced tumor delineation
- Statistical texture priors and Gabor filters for feature enhancement

## Team

- MAR.Kaveesha - Team Leader
- WMN.Thilina - Team Member

## License

Copyright © 2025 Team Cipher. All rights reserved.
