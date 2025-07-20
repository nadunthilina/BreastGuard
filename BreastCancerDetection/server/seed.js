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

// Sample detection history data
const getDetectionHistoryData = (userId) => {
  return [
    {
      userId,
      prediction: 'benign',
      confidence: 0.89,
      features: {
        radius: 10.42,
        texture: 15.35,
        perimeter: 67.38,
        area: 337.47,
        smoothness: 0.08,
        compactness: 0.07,
        concavity: 0.05,
        concave_points: 0.03,
        symmetry: 0.18,
        fractal_dimension: 0.06
      },
      details: {
        age: 45,
        familyHistory: false,
        previousTreatments: "None",
        biopsyLocation: "Left breast, upper outer quadrant",
        tumorSize: "1.2 cm",
        nodalStatus: "Negative",
        estrogenReceptor: "Positive",
        progesteroneReceptor: "Positive",
        her2Status: "Negative",
        grade: "Grade 1",
        stageClassification: "Stage IA",
        recommendedFollowUp: "Routine mammogram in 6 months"
      },
      imageHash: 'sample_hash_1',
      imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      notes: "Patient presented with a palpable mass in the left breast. Ultrasound revealed a well-circumscribed mass with benign features. Biopsy confirmed benign fibroadenoma."
    },
    {
      userId,
      prediction: 'malignant',
      confidence: 0.92,
      features: {
        radius: 18.67,
        texture: 24.71,
        perimeter: 121.33,
        area: 1068.90,
        smoothness: 0.11,
        compactness: 0.28,
        concavity: 0.33,
        concave_points: 0.18,
        symmetry: 0.22,
        fractal_dimension: 0.08
      },
      details: {
        age: 57,
        familyHistory: true,
        previousTreatments: "Lumpectomy (2023)",
        biopsyLocation: "Right breast, upper inner quadrant",
        tumorSize: "2.8 cm",
        nodalStatus: "Positive (2/12)",
        estrogenReceptor: "Positive",
        progesteroneReceptor: "Negative",
        her2Status: "Positive",
        grade: "Grade 3",
        stageClassification: "Stage IIB",
        recommendedFollowUp: "Immediate referral to oncology, chemotherapy and radiation recommended"
      },
      imageHash: 'sample_hash_2',
      imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      notes: "Patient with family history of breast cancer presented for routine screening. Mammogram revealed suspicious mass with irregular borders and microcalcifications. Ultrasound and biopsy confirmed invasive ductal carcinoma."
    },
    {
      userId,
      prediction: 'benign',
      confidence: 0.95,
      features: {
        radius: 11.38,
        texture: 14.31,
        perimeter: 72.33,
        area: 401.35,
        smoothness: 0.09,
        compactness: 0.06,
        concavity: 0.04,
        concave_points: 0.02,
        symmetry: 0.17,
        fractal_dimension: 0.06
      },
      details: {
        age: 38,
        familyHistory: false,
        previousTreatments: "None",
        biopsyLocation: "Right breast, lower outer quadrant",
        tumorSize: "0.8 cm",
        nodalStatus: "Not applicable",
        estrogenReceptor: "Not applicable",
        progesteroneReceptor: "Not applicable",
        her2Status: "Not applicable",
        grade: "Not applicable",
        stageClassification: "Not applicable",
        recommendedFollowUp: "Annual mammogram"
      },
      imageHash: 'sample_hash_3',
      imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      notes: "Patient presented with breast pain and palpable lump. Ultrasound indicated benign characteristics. Biopsy confirmed benign cyst."
    }
  ];
};

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

    // Create sample detection records for each user
    for (const user of createdUsers) {
      const historyData = getDetectionHistoryData(user._id);
      for (const record of historyData) {
        await DetectionResult.create(record);
        console.log(`Created detection record for: ${user.username}`);
      }
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding function
seedDatabase();
