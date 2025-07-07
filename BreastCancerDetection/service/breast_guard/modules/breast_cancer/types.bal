// Data types for breast cancer detection service

// User record type
public type User record {
    int id?;
    string username;
    string email;
    string password;
    string name;
};

// Authentication response type
public type AuthResponse record {
    string token;
    User user;
};

// Login request type
public type LoginRequest record {
    string email;
    string password;
};

// Breast Cancer Detection Features
public type BreastCancerFeatures record {
    float radius;
    float texture;
    float perimeter;
    float area;
    float smoothness;
    float compactness;
    float concavity;
    float concave_points;
    float symmetry;
    float fractal_dimension;
};

// Breast Cancer Detection Request
public type DetectionRequest record {
    string userId;
    string imageBase64;
};

// Breast Cancer Detection Result
public type DetectionResult record {
    string id?;
    string userId;
    string prediction; // "benign" or "malignant"
    float confidence;
    BreastCancerFeatures features;
    string timestamp?;
};

// Error response type
public type ErrorResponse record {
    string message;
    string details?;
};
