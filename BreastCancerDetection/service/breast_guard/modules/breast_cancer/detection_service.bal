import ballerina/http;
import ballerina/io;
import ballerina/mime;

import breast_guard.breast_cancer;

configurable string MODEL_SERVICE_URL = ?;

public class DetectionService {
    private final http:Client aiModelClient;
    private final breast_cancer:UserService userService;
    
    public function init() returns error? {
        self.aiModelClient = check new (MODEL_SERVICE_URL);
        self.userService = new();
    }
    
    // Process image for breast cancer detection
    public function detectBreastCancer(breast_cancer:DetectionRequest req) returns breast_cancer:DetectionResult|breast_cancer:ErrorResponse|error {
        if (req.imageBase64 == "") {
            return {
                message: "Image data is required"
            };
        }
        
        // Send image to AI model for prediction
        json requestPayload = {
            "image": req.imageBase64
        };
        
        http:Response|error response = self.aiModelClient->post("/predict", requestPayload);
        
        if response is error {
            return {
                message: "Error connecting to AI model service",
                details: response.message()
            };
        }
        
        if response.statusCode != 200 {
            string errorMsg = check response.getTextPayload();
            return {
                message: "Error from AI model service",
                details: errorMsg
            };
        }
        
        json resultJson = check response.getJsonPayload();
        
        // Extract prediction results from AI model response
        json predictionJson = check resultJson.prediction;
        string prediction = check predictionJson.ensureType();
        
        json confidenceJson = check resultJson.confidence;
        float confidence = check confidenceJson.ensureType();
        
        json featuresJson = check resultJson.features;
        
        // Create detection result record
        breast_cancer:DetectionResult result = {
            userId: req.userId,
            prediction: prediction,
            confidence: confidence,
            features: {
                radius: check extractFeatureValue(featuresJson, "radius"),
                texture: check extractFeatureValue(featuresJson, "texture"),
                perimeter: check extractFeatureValue(featuresJson, "perimeter"),
                area: check extractFeatureValue(featuresJson, "area"),
                smoothness: check extractFeatureValue(featuresJson, "smoothness"),
                compactness: check extractFeatureValue(featuresJson, "compactness"),
                concavity: check extractFeatureValue(featuresJson, "concavity"),
                concave_points: check extractFeatureValue(featuresJson, "concave_points"),
                symmetry: check extractFeatureValue(featuresJson, "symmetry"),
                fractal_dimension: check extractFeatureValue(featuresJson, "fractal_dimension")
            }
        };
        
        // Save detection result to database
        breast_cancer:DetectionResult|breast_cancer:ErrorResponse|error savedResult = self.userService.saveDetectionResult(result);
        
        if savedResult is breast_cancer:DetectionResult {
            return savedResult;
        } else if savedResult is breast_cancer:ErrorResponse {
            return savedResult;
        } else {
            return {
                message: "Error saving detection result",
                details: savedResult.message()
            };
        }
    }
    
    // Upload image for processing
    public function uploadImage(http:Request request) returns breast_cancer:DetectionResult|breast_cancer:ErrorResponse|error {
        // Extract user ID from request
        string userId = request.getHeader("X-User-ID") ?: "";
        if userId == "" {
            return {
                message: "User ID is required"
            };
        }
        
        // Extract image from multipart request
        mime:Entity[] bodyParts = check request.getBodyParts();
        string base64Image = "";
        
        foreach mime:Entity part in bodyParts {
            if part.getContentDisposition().name == "image" {
                byte[] imageBytes = check part.getByteArray();
                base64Image = imageBytes.toBase64();
                break;
            }
        }
        
        if base64Image == "" {
            return {
                message: "Image file is required"
            };
        }
        
        // Process the image for detection
        breast_cancer:DetectionRequest detectionReq = {
            userId: userId,
            imageBase64: base64Image
        };
        
        return self.detectBreastCancer(detectionReq);
    }
    
    // Get detection history for a user
    public function getDetectionHistory(string userId) returns breast_cancer:DetectionResult[]|breast_cancer:ErrorResponse|error {
        return self.userService.getUserDetectionResults(userId);
    }
}

// Helper function to extract feature value from JSON
function extractFeatureValue(json features, string featureName) returns float|error {
    json featureJson = check features[featureName];
    return check featureJson.ensureType();
}
