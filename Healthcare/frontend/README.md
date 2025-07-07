# Healthcare Frontend

This folder contains the frontend application that interacts with the Ballerina Healthcare backend services.

## Prerequisites

- Node.js (v14 or newer)
- npm (v6 or newer)

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Access the application:
   - Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally

## Important Notes

- The frontend assumes the Ballerina backend is running on:
  - Authentication service: `http://localhost:8080/auth`
  - Heart disease service: `http://localhost:8081/heart_disease`
- Make sure your Ballerina services are running before using the frontend
