# Parents Registration Backend

A Spring Boot backend application for managing parent registrations with SQLite database integration.

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Development Guide](#development-guide)
- [Testing](#testing)
- [Deployment](#deployment)

## Overview

The backend is built using Spring Boot 2.7.0 and provides RESTful API endpoints for parent registration management. It uses SQLite as the database and includes features for data validation, error handling, and connection monitoring.

## Project Structure

```
backend-parents-registration/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/parents/registration/
│   │   │       ├── controller/
│   │   │       │   └── ParentController.java
│   │   │       ├── dao/
│   │   │       │   └── ParentDAO.java
│   │   │       ├── database/
│   │   │       │   └── DatabaseHelper.java
│   │   │       ├── model/
│   │   │       │   └── Parent.java
│   │   │       └── Main.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## Dependencies

Key dependencies in `pom.xml`:
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>2.7.0</version>
    </dependency>
    <dependency>
        <groupId>org.xerial</groupId>
        <artifactId>sqlite-jdbc</artifactId>
        <version>3.36.0.3</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.13.0</version>
    </dependency>
</dependencies>
```

## Configuration

### application.properties
```properties
server.port=8080
spring.jackson.serialization.write-dates-as-timestamps=false
```

### Database Configuration
The database is automatically created and managed by `DatabaseHelper.java`. The database file is created in the project root directory.

## API Documentation

### Parent Controller Endpoints

#### Test Connection
- **URL**: `/api/parents/test`
- **Method**: `GET`
- **Response**: 
  ```json
  {
    "status": "success",
    "message": "Backend is working!"
  }
  ```

#### Create Parent
- **URL**: `/api/parents`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "string",
    "surname": "string",
    "email": "string",
    "age": "integer",
    "address": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "status": "success",
    "message": "Parent registered successfully"
  }
  ```

#### Get All Parents
- **URL**: `/api/parents`
- **Method**: `GET`
- **Response**: Array of parent objects

#### Get Parent by ID
- **URL**: `/api/parents/{id}`
- **Method**: `GET`
- **Response**: Single parent object

## Database

### Schema
The database consists of two tables:

1. **parents** table:
   - id (PRIMARY KEY)
   - name (TEXT)
   - surname (TEXT)
   - email (TEXT, UNIQUE)
   - age (INTEGER)
   - address (TEXT)
   - created_at (TIMESTAMP)

2. **students** table:
   - id (PRIMARY KEY)
   - parent_id (FOREIGN KEY)
   - name (TEXT)
   - birth_date (DATE)
   - grade (TEXT)
   - created_at (TIMESTAMP)

### Database Operations
The `ParentDAO` class handles all database operations:
- Connection management
- CRUD operations
- Prepared statements
- Error handling

## Development Guide

### Prerequisites
- Java 11 or higher
- Maven 3.6 or higher
- SQLite

### Setup
1. Clone the repository
2. Navigate to the backend directory
3. Run `mvn clean install`
4. Start the application with `mvn spring-boot:run`

### Code Style
- Follow Java naming conventions
- Use meaningful variable names
- Add comments for complex logic
- Handle exceptions appropriately

## Testing

### Unit Tests
Run tests using:
```bash
mvn test
```

### API Testing
Use tools like Postman or curl to test endpoints:
```bash
# Test connection
curl http://localhost:8080/api/parents/test

# Create parent
curl -X POST http://localhost:8080/api/parents \
  -H "Content-Type: application/json" \
  -d '{"name":"John","surname":"Doe","email":"john@example.com"}'
```

## Deployment

### Production Deployment
1. Build the JAR file:
   ```bash
   mvn clean package
   ```

2. Run the JAR:
   ```bash
   java -jar target/parents-registration-backend-1.0.0.jar
   ```

### Environment Variables
- `SERVER_PORT`: Override default port (8080)
- `DATABASE_PATH`: Custom database file path

## Error Handling

The backend implements comprehensive error handling:
- Input validation
- Database connection errors
- SQL exceptions
- HTTP status codes
- JSON parsing errors

## Security

- Input validation
- SQL injection prevention
- CORS configuration
- Error message sanitization

## Monitoring

The system includes:
- Connection status monitoring
- Error logging
- Request/response logging
- Database operation logging 