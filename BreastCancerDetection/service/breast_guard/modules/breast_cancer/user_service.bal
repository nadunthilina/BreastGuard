import ballerina/crypto;
import ballerina/sql;
import ballerina/time;
import ballerina/uuid;
import ballerinax/mysql;

import breast_guard.breast_cancer;

public class UserService {
    private final mysql:Client dbClient;
    
    public function init() returns error? {
        self.dbClient = breast_cancer:dbClient;
        // Create tables if they don't exist
        check self.initializeDatabase();
    }
    
    // Initialize database tables
    private function initializeDatabase() returns error? {
        _ = check self.dbClient->execute(`
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        _ = check self.dbClient->execute(`
            CREATE TABLE IF NOT EXISTS detection_result (
                id VARCHAR(36) PRIMARY KEY,
                user_id INT,
                prediction VARCHAR(20) NOT NULL,
                confidence FLOAT NOT NULL,
                radius FLOAT,
                texture FLOAT,
                perimeter FLOAT,
                area FLOAT,
                smoothness FLOAT,
                compactness FLOAT,
                concavity FLOAT,
                concave_points FLOAT,
                symmetry FLOAT,
                fractal_dimension FLOAT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES user(id)
            )
        `);
    }
    
    // Register a new user
    public function registerUser(breast_cancer:User user) returns breast_cancer:User|breast_cancer:ErrorResponse|error {
        // Hash the password
        string hashedPassword = crypto:hashSha256(user.password.toBytes()).toBase16();
        
        // Check if email already exists
        sql:ParameterizedQuery emailQuery = `SELECT email FROM user WHERE email = ${user.email}`;
        stream<record {}, error?> emailResult = self.dbClient->query(emailQuery);
        
        record {|record {} value;|}? emailRecord = check emailResult.next();
        check emailResult.close();
        
        if emailRecord != () {
            return {
                message: "Email already in use"
            };
        }
        
        // Check if username already exists
        sql:ParameterizedQuery usernameQuery = `SELECT username FROM user WHERE username = ${user.username}`;
        stream<record {}, error?> usernameResult = self.dbClient->query(usernameQuery);
        
        record {|record {} value;|}? usernameRecord = check usernameResult.next();
        check usernameResult.close();
        
        if usernameRecord != () {
            return {
                message: "Username already in use"
            };
        }
        
        // Insert the new user
        sql:ParameterizedQuery insertQuery = `
            INSERT INTO user(username, email, password, name)
            VALUES (${user.username}, ${user.email}, ${hashedPassword}, ${user.name})
        `;
        
        sql:ExecutionResult result = check self.dbClient->execute(insertQuery);
        
        if result.affectedRowCount > 0 {
            // Return the registered user (without password)
            int userId = <int>result.lastInsertId;
            return {
                id: userId,
                username: user.username,
                email: user.email,
                password: "", // Don't return the password
                name: user.name
            };
        } else {
            return {
                message: "Failed to register user"
            };
        }
    }
    
    // Authenticate a user
    public function loginUser(breast_cancer:LoginRequest loginReq) returns breast_cancer:AuthResponse|breast_cancer:ErrorResponse|error {
        // Hash the password
        string hashedPassword = crypto:hashSha256(loginReq.password.toBytes()).toBase16();
        
        // Query for user with matching email and password
        sql:ParameterizedQuery query = `
            SELECT id, username, email, name
            FROM user
            WHERE email = ${loginReq.email} AND password = ${hashedPassword}
        `;
        
        stream<record {}, error?> result = self.dbClient->query(query);
        record {|record {} value;|}? userRecord = check result.next();
        check result.close();
        
        if userRecord == () {
            return {
                message: "Invalid email or password"
            };
        }
        
        record {} user = userRecord.value;
        
        // Generate a simple token (in a real app, use JWT)
        string token = uuid:createType1AsString();
        
        return {
            token: token,
            user: {
                id: <int>user["id"],
                username: <string>user["username"],
                email: <string>user["email"],
                password: "", // Don't return the password
                name: <string>user["name"]
            }
        };
    }
    
    // Get user by ID
    public function getUserById(int userId) returns breast_cancer:User|breast_cancer:ErrorResponse|error {
        sql:ParameterizedQuery query = `
            SELECT id, username, email, name
            FROM user
            WHERE id = ${userId}
        `;
        
        stream<record {}, error?> result = self.dbClient->query(query);
        record {|record {} value;|}? userRecord = check result.next();
        check result.close();
        
        if userRecord == () {
            return {
                message: "User not found"
            };
        }
        
        record {} user = userRecord.value;
        
        return {
            id: <int>user["id"],
            username: <string>user["username"],
            email: <string>user["email"],
            password: "", // Don't return the password
            name: <string>user["name"]
        };
    }
    
    // Save detection result
    public function saveDetectionResult(breast_cancer:DetectionResult result) returns breast_cancer:DetectionResult|breast_cancer:ErrorResponse|error {
        // Generate ID if not provided
        string id = result?.id ?: uuid:createType1AsString();
        
        // Parse userId to integer
        int userId = check int:fromString(result.userId);
        
        // Set timestamp if not provided
        string timestamp = result?.timestamp ?: time:utcToString(time:utcNow());
        
        sql:ParameterizedQuery insertQuery = `
            INSERT INTO detection_result(
                id, user_id, prediction, confidence, 
                radius, texture, perimeter, area,
                smoothness, compactness, concavity, concave_points,
                symmetry, fractal_dimension, timestamp
            )
            VALUES (
                ${id}, ${userId}, ${result.prediction}, ${result.confidence},
                ${result.features.radius}, ${result.features.texture}, 
                ${result.features.perimeter}, ${result.features.area},
                ${result.features.smoothness}, ${result.features.compactness}, 
                ${result.features.concavity}, ${result.features.concave_points},
                ${result.features.symmetry}, ${result.features.fractal_dimension},
                ${timestamp}
            )
        `;
        
        sql:ExecutionResult sqlResult = check self.dbClient->execute(insertQuery);
        
        if sqlResult.affectedRowCount > 0 {
            return {
                id: id,
                userId: result.userId,
                prediction: result.prediction,
                confidence: result.confidence,
                features: result.features,
                timestamp: timestamp
            };
        } else {
            return {
                message: "Failed to save detection result"
            };
        }
    }
    
    // Get detection results for a user
    public function getUserDetectionResults(string userId) returns breast_cancer:DetectionResult[]|breast_cancer:ErrorResponse|error {
        int userIdInt = check int:fromString(userId);
        
        sql:ParameterizedQuery query = `
            SELECT id, user_id, prediction, confidence, 
                radius, texture, perimeter, area,
                smoothness, compactness, concavity, concave_points,
                symmetry, fractal_dimension, timestamp
            FROM detection_result
            WHERE user_id = ${userIdInt}
            ORDER BY timestamp DESC
        `;
        
        stream<record {}, error?> resultStream = self.dbClient->query(query);
        breast_cancer:DetectionResult[] results = [];
        
        error? e = resultStream.forEach(function(record {} result) {
            breast_cancer:DetectionResult detectionResult = {
                id: <string>result["id"],
                userId: userId,
                prediction: <string>result["prediction"],
                confidence: <float>result["confidence"],
                features: {
                    radius: <float>result["radius"],
                    texture: <float>result["texture"],
                    perimeter: <float>result["perimeter"],
                    area: <float>result["area"],
                    smoothness: <float>result["smoothness"],
                    compactness: <float>result["compactness"],
                    concavity: <float>result["concavity"],
                    concave_points: <float>result["concave_points"],
                    symmetry: <float>result["symmetry"],
                    fractal_dimension: <float>result["fractal_dimension"]
                },
                timestamp: <string>result["timestamp"]
            };
            results.push(detectionResult);
        });
        
        if e is error {
            return {
                message: "Error retrieving detection results",
                details: e.message()
            };
        }
        
        return results;
    }
}
