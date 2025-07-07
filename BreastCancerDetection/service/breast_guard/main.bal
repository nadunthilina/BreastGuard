import ballerina/http;
import ballerina/log;

import breast_guard.breast_cancer;

// Initialize services
breast_cancer:UserService userService = check new();
breast_cancer:DetectionService detectionService = check new();

// Service for authentication and user management
service /auth on new http:Listener(9090) {
    // CORS configuration
    resource function 'default [string... paths](http:Request req) returns http:Response|error {
        http:Response res = new;
        res.addHeader("Access-Control-Allow-Origin", "*");
        res.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
        res.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-ID");
        
        if req.method == "OPTIONS" {
            res.statusCode = 200;
            return res;
        }
        
        res.statusCode = 404;
        res.setJsonPayload({
            message: "Not Found"
        });
        return res;
    }
    
    // Register a new user
    resource function post signup(@http:Payload breast_cancer:User payload) returns breast_cancer:User|breast_cancer:ErrorResponse|error {
        log:printInfo("Signup request received for email: " + payload.email);
        return userService.registerUser(payload);
    }
    
    // Login an existing user
    resource function post login(@http:Payload breast_cancer:LoginRequest payload) returns breast_cancer:AuthResponse|breast_cancer:ErrorResponse|error {
        log:printInfo("Login request received for email: " + payload.email);
        return userService.loginUser(payload);
    }
    
    // Get user profile
    resource function get profile/[int userId]() returns breast_cancer:User|breast_cancer:ErrorResponse|error {
        log:printInfo("Profile request received for user ID: " + userId.toString());
        return userService.getUserById(userId);
    }
}

// Service for breast cancer detection
service /api on new http:Listener(9091) {
    // CORS configuration
    resource function 'default [string... paths](http:Request req) returns http:Response|error {
        http:Response res = new;
        res.addHeader("Access-Control-Allow-Origin", "*");
        res.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        res.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-ID");
        
        if req.method == "OPTIONS" {
            res.statusCode = 200;
            return res;
        }
        
        res.statusCode = 404;
        res.setJsonPayload({
            message: "Not Found"
        });
        return res;
    }
    
    // Process an image to detect breast cancer
    resource function post detect(@http:Payload breast_cancer:DetectionRequest payload) returns breast_cancer:DetectionResult|breast_cancer:ErrorResponse|error {
        log:printInfo("Detection request received for user ID: " + payload.userId);
        return detectionService.detectBreastCancer(payload);
    }
    
    // Upload an image file for detection
    resource function post upload(http:Request request) returns breast_cancer:DetectionResult|breast_cancer:ErrorResponse|error {
        log:printInfo("Image upload request received");
        return detectionService.uploadImage(request);
    }
    
    // Get detection history for a user
    resource function get history/[string userId]() returns breast_cancer:DetectionResult[]|breast_cancer:ErrorResponse|error {
        log:printInfo("Detection history request received for user ID: " + userId);
        return detectionService.getDetectionHistory(userId);
    }
}
