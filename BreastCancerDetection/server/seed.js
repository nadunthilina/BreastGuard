// Database initialization script for MongoDB
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const DetectionResult = require('./models/detectionModel');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

// Sample users
const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin', // Will be hashed
    name: 'Admin User'
  },
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'password', // Will be hashed
    name: 'Test User 1'
  },
  {
    username: 'doctor1',
    email: 'doctor@example.com',
    password: 'doctor123', // Will be hashed
    name: 'Dr. Sarah Johnson'
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await DetectionResult.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample users
    const createdUsers = [];
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const createdUser = await User.create({
        ...user,
        password: hashedPassword
      });
      createdUsers.push(createdUser);
      console.log(`Created user: ${user.username}`);
    }

    // Create some sample detection results
    const sampleFeatures = [
      {
        radius: 15.2,
        texture: 19.5,
        perimeter: 98.7,
        area: 750.3,
        smoothness: 0.08,
        compactness: 0.12,
        concavity: 0.15,
        concave_points: 0.08,
        symmetry: 0.18,
        fractal_dimension: 0.06
      },
      {
        radius: 18.7,
        texture: 23.2,
        perimeter: 122.5,
        area: 1050.2,
        smoothness: 0.11,
        compactness: 0.23,
        concavity: 0.28,
        concave_points: 0.14,
        symmetry: 0.22,
        fractal_dimension: 0.07
      }
    ];

    // Add some detection results for the first user
    await DetectionResult.create({
      userId: createdUsers[0]._id,
      prediction: 'benign',
      confidence: 0.89,
      features: sampleFeatures[0],
      imageHash: '7e9f8c9a4b3c2d1e0f',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    });

    await DetectionResult.create({
      userId: createdUsers[0]._id,
      prediction: 'malignant',
      confidence: 0.76,
      features: sampleFeatures[1],
      imageHash: '2a3b4c5d6e7f8g9h0i',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    });

    console.log('Sample detection results created');
    console.log('Database seeding completed successfully');

    // Disconnect from database
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
