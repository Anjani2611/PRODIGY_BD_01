# PRODIGY_BD_01
REST API with CRUD operations for users management.

# Users REST API - CRUD Operations
A production-ready REST API built with Node.js and Express, implementing complete CRUD operations with in-memory storage and comprehensive validation.

## Features

- Full REST API - POST, GET, PUT, PATCH, DELETE
- UUID Generation - Unique user identifiers
- Input Validation - Email, Age, Name validation
- Error Handling - Comprehensive error management
- HTTP Status Codes - Proper status codes (201, 200, 400, 404, 500)
- In-Memory Storage - HashMap-based data structure
- Health Check - /health endpoint
- Environment Config - PORT from environment variables

## Tech Stack

- Runtime: Node.js
- Framework: Express.js
- UUID: uuid package (RFC 4122 v4)
- Storage: In-Memory Map
- No Database: Demo implementation

## API Endpoints

### Create User
```
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}

Response: 201 Created
{
  "success": true,
  "message": "User created successfully",
  "data": { ... },
  "status": 201
}
```

### Get All Users
```
GET /users

Response: 200 OK
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [ ... ],
  "count": 5,
  "status": 200
}
```

### Get Single User
```
GET /users/{id}

Response: 200 OK or 404 Not Found
```

### Update User (Full)
```
PUT /users/{id}
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com",
  "age": 30
}

Response: 200 OK
```

### Partial Update
```
PATCH /users/{id}
Content-Type: application/json

{
  "name": "Updated Name"
}

Response: 200 OK
```

### Delete User
```
DELETE /users/{id}

Response: 200 OK
{
  "success": true,
  "message": "User deleted successfully",
  "status": 200
}
```

### Health Check
```
GET /health

Response: 200 OK
{
  "success": true,
  "message": "API is running",
  "status": 200,
  "timestamp": "2025-12-15T..."
}
```

## Validation Rules

| Field | Rules |
|-------|-------|
| Name | Required, non-empty string, max 100 chars |
| Email | Required, valid email format, unique |
| Age | Required, integer between 1-149 |
| ID | Auto-generated UUID (RFC 4122 v4) |

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 201 | User created successfully |
| 200 | Request successful (GET/PUT/DELETE) |
| 400 | Bad request (validation error) |
| 404 | User not found |
| 500 | Internal server error |

## Installation & Running

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/users-rest-api.git
cd users-rest-api

# Install dependencies
npm install

# Start server
npm start

# Server runs on http://localhost:3000
```

### Development
```bash
# Run with nodemon (auto-reload on changes)
npm install --save-dev nodemon
npx nodemon server.js
```

## Testing with cURL

bash
# Create user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","age":25}'

# Get all users
curl http://localhost:3000/users

# Get single user (replace {id} with actual UUID)
curl http://localhost:3000/users/{id}

# Update user
curl -X PUT http://localhost:3000/users/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name","email":"updated@example.com","age":30}'

# Partial update
curl -X PATCH http://localhost:3000/users/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"New Name"}'

# Delete user
curl -X DELETE http://localhost:3000/users/{id}

# Health check
curl http://localhost:3000/health

## Testing with Postman

1. Import collection or create requests manually
2. Set method: POST, GET, PUT, PATCH, DELETE
3. URL: http://localhost:3000/users
4. Headers: Content-Type: application/json
5. Send request

## Project Structure

users-rest-api/
├── server.js              # Main Express app
├── package.json           # Dependencies & scripts
├── package-lock.json      # Dependency lock file
├── .gitignore            # Git ignore rules
├── README.md             # Documentation
└── .env                  # Environment variables (optional)

## Deployment Options

### Heroku (Recommended for learning)
bash
# Install Heroku CLI
# Create Heroku app
heroku create your-app-name

# Deploy
git push heroku main

# View logs
heroku logs --tail

### Railway
1. Connect GitHub repository
2. Select server.js as start command
3. Deploy automatically

### Render.com
1. Connect GitHub
2. Select Node service
3. Deploy

### DigitalOcean App Platform
1. Connect GitHub
2. Set start command: npm start
3. Deploy

## Learning Outcomes
This project demonstrates:
- RESTful API design principles
- CRUD operations in Node.js/Express
- Input validation and error handling
- HTTP methods and status codes
- In-memory data structures (Map)
- UUID generation
- Middleware usage
- Try-catch error handling

## Future Enhancements
- Database integration (MongoDB/PostgreSQL)
- JWT Authentication
- User roles and permissions
- API rate limiting
- CORS support
- Request logging (Morgan)
- API documentation (Swagger/OpenAPI)
- Unit tests (Jest)
- Docker containerization
- CI/CD pipeline

## Important Notes

### Current Implementation
- Data reset on server restart
- No database persistence
- Single-instance (not scalable)
- No authentication

### For Production
- Add database (MongoDB/PostgreSQL)
- Implement authentication (JWT)
- Add CORS
- Use environment variables
- Add logging (Winston/Morgan)
- Add unit tests
- Use HTTPS
- Implement rate limiting

## License
MIT License - Feel free to use for learning and internship projects

## Author
Created for BTech Backend Development Internship
