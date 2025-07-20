# BreastGuard
Breast Cancer Detection System

This repository contains the comprehensive BreastGuard application - a breast cancer detection system that implements machine learning models using Flask and integrates with a Ballerina backend for diagnosis.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features

- RESTful API for breast cancer diagnosis
- Integrates with machine learning models to provide predictions
- User authentication and profile management
- Image upload and analysis capabilities
- Medical record management
- Healthcare data processing with Ballerina

## Technologies

- **Frontend**: React, Vite
- **Backend**: Ballerina, Node.js
- **Machine Learning**: Flask (Python), scikit-learn
- **Data Handling**: Pandas, NumPy
- **Database**: MySQL
- **Authentication**: JWT

## Installation

### Prerequisites

Make sure you have the following installed:

- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [Ballerina](https://ballerina.io/)
- [Node.js](https://nodejs.org/en/download/prebuilt-installer/current)

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nadunthilina/BreastGuard
   cd BreastGuard

2. **Frontend dependencies:**
   ```bash
   cd BreastCancerDetection/frontend
   npm install

3. **Backend (Node.js) dependencies:**
   ```bash
   cd BreastCancerDetection/server
   npm install

4. **Python ML Model dependencies:**
   ```bash
   cd BreastCancerDetection/model_service
   pip install -r requirements.txt

## Usage

1. **Start the Ballerina service:**
   ```bash
   cd BreastCancerDetection/service/breast_guard
   bal build
   bal run

2. **Start the Node.js backend:**
   ```bash
   cd BreastCancerDetection/server
   npm start

3. **Start the React frontend:**
   ```bash
   cd BreastCancerDetection/frontend
   npm run dev

4. **Start the ML model service:**
   ```bash
   cd BreastCancerDetection/model_service
   python app.py

The application should now be running with all services connected.

## Project Structure

- `BreastCancerDetection/` - Main application directory
  - `frontend/` - React frontend application
  - `server/` - Node.js backend API
  - `model_service/` - Python Flask ML service
  - `service/` - Ballerina healthcare service
- `Healthcare/` - Additional healthcare components
- `MLmodel/` - Machine learning models and notebooks
