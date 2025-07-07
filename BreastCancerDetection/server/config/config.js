// Configuration settings for different environments
const config = {
  development: {
    port: process.env.PORT || 4000,
    corsOrigin: 'http://localhost:5173', // Frontend development server
    jwtSecret: process.env.JWT_SECRET || 'breast_cancer_detection_jwt_secret_2025',
    jwtExpiration: '30d',
    modelServiceUrl: process.env.MODEL_SERVICE_URL || 'http://localhost:5000'
  },
  production: {
    port: process.env.PORT || 4000,
    corsOrigin: process.env.FRONTEND_URL || 'http://localhost:5173',
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: '30d',
    modelServiceUrl: process.env.MODEL_SERVICE_URL
  }
};

// Determine current environment
const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
