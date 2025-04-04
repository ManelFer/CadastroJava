# Parents Registration System

A full-stack application for managing parent registrations in an educational institution. The system consists of a React Native frontend and a Spring Boot backend with SQLite database.

## System Architecture

### Backend (Java/Spring Boot)
- **Framework**: Spring Boot 2.7.0
- **Database**: SQLite
- **API**: RESTful
- **Port**: 8080

### Frontend (React Native)
- **Framework**: React Native
- **State Management**: React Hooks
- **API Integration**: Fetch API
- **Development Server**: Expo

## Features

### Parent Registration
- Name and surname input
- Email validation
- Age input (optional)
- Address input (optional)
- Real-time form validation
- Success/error notifications

### Backend Services
- RESTful API endpoints
- Data validation
- Error handling
- Database persistence
- Connection status monitoring

## API Endpoints

### Parents API (`/api/parents`)
- `GET /test` - Test backend connection
- `POST /` - Create a new parent
- `GET /` - List all parents
- `GET /{id}` - Get parent by ID

## Database Schema

### Parents Table
```sql
CREATE TABLE parents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Students Table
```sql
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER,
    name TEXT NOT NULL,
    birth_date DATE,
    grade TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES parents(id)
)
```

## Installation

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend-parents-registration
   ```

2. Install dependencies:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend-parents-registration
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Configuration

### Backend Configuration
- Port: 8080 (configurable in `application.properties`)
- Database: SQLite (automatically created at runtime)

### Frontend Configuration
- API URL: `http://localhost:8080` (configurable in `config.ts`)

## Usage

1. Start the backend server
2. Start the frontend development server
3. Open the application in your browser or mobile device
4. Fill in the parent registration form
5. Submit the form to create a new parent record

## Error Handling

### Frontend
- Form validation for required fields
- Network error handling
- User-friendly error messages
- Connection status indicator

### Backend
- Input validation
- Database error handling
- Proper HTTP status codes
- Detailed error messages

## Security Considerations

- Input validation on both frontend and backend
- SQL injection prevention through prepared statements
- CORS configuration for API access
- Error message sanitization

## Development

### Backend Development
- Java 11 or higher required
- Maven for dependency management
- Spring Boot for rapid development
- SQLite for lightweight database

### Frontend Development
- Node.js required
- Expo for React Native development
- TypeScript for type safety
- React Native for cross-platform development

## Testing

### Backend Testing
1. Run unit tests:
   ```bash
   mvn test
   ```

2. Test API endpoints using tools like Postman or curl

### Frontend Testing
1. Test form validation
2. Test API integration
3. Test error handling
4. Test connection status

## Troubleshooting

### Common Issues
1. Port conflicts
   - Solution: Change port in `application.properties`

2. Database connection issues
   - Solution: Check database file permissions

3. CORS issues
   - Solution: Verify CORS configuration in backend

4. Form submission errors
   - Solution: Check network tab in browser dev tools

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or issues, please open an issue in the repository. 