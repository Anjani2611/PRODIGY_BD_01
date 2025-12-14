# USER CRUD API - COMPREHENSIVE TESTING GUIDE

## API Endpoints Summary

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|------------|
| POST | /users | Create a new user | 201 |
| GET | /users | Get all users | 200 |
| GET | /users/:id | Get user by ID | 200 |
| PUT | /users/:id | Update entire user | 200 |
| PATCH | /users/:id | Partial update user | 200 |
| DELETE | /users/:id | Delete user | 200 |
| GET | /health | Health check | 200 |

---

## TEST SCENARIOS

### 1. CREATE USER (POST /users)

#### Success Case
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }'

Response (201):
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "createdAt": "2025-11-15T22:00:00.000Z",
    "updatedAt": "2025-11-15T22:00:00.000Z"
  },
  "status": 201
}
```

#### Error Cases

**Missing Required Field (Name)**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "age": 30
  }'

Response (400):
{
  "success": false,
  "error": "Name is required",
  "status": 400
}
```

**Invalid Email Format**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "invalid-email",
    "age": 30
  }'

Response (400):
{
  "success": false,
  "error": "Invalid email format",
  "status": 400
}
```

**Invalid Age (Outside Range)**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 200
  }'

Response (400):
{
  "success": false,
  "error": "Age must be a number between 1 and 149",
  "status": 400
}
```

**Duplicate Email**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "john@example.com",
    "age": 25
  }'

Response (400):
{
  "success": false,
  "error": "Email already exists",
  "status": 400
}
```

---

### 2. GET ALL USERS (GET /users)

#### Success Case
```bash
curl -X GET http://localhost:3000/users

Response (200):
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "createdAt": "2025-11-15T22:00:00.000Z",
      "updatedAt": "2025-11-15T22:00:00.000Z"
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "age": 28,
      "createdAt": "2025-11-15T22:05:00.000Z",
      "updatedAt": "2025-11-15T22:05:00.000Z"
    }
  ],
  "count": 2,
  "status": 200
}
```

---

### 3. GET SINGLE USER (GET /users/:id)

#### Success Case
```bash
curl -X GET http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000

Response (200):
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "createdAt": "2025-11-15T22:00:00.000Z",
    "updatedAt": "2025-11-15T22:00:00.000Z"
  },
  "status": 200
}
```

#### Error Cases

**Invalid UUID Format**
```bash
curl -X GET http://localhost:3000/users/invalid-id

Response (400):
{
  "success": false,
  "error": "Invalid user ID format",
  "status": 400
}
```

**User Not Found**
```bash
curl -X GET http://localhost:3000/users/999e8400-e29b-41d4-a716-446655440000

Response (404):
{
  "success": false,
  "error": "User not found",
  "status": 404
}
```

---

### 4. UPDATE USER (PUT /users/:id)

#### Success Case (Full Update)
```bash
curl -X PUT http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "age": 31
  }'

Response (200):
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "age": 31,
    "createdAt": "2025-11-15T22:00:00.000Z",
    "updatedAt": "2025-11-15T22:10:00.000Z"
  },
  "status": 200
}
```

#### Error Cases

**Invalid Email During Update**
```bash
curl -X PUT http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "invalid",
    "age": 31
  }'

Response (400):
{
  "success": false,
  "error": "Invalid email format",
  "status": 400
}
```

---

### 5. PATCH USER (PATCH /users/:id)

#### Success Case (Partial Update)
```bash
curl -X PATCH http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jonathan Doe"
  }'

Response (200):
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Jonathan Doe",
    "email": "john@example.com",
    "age": 30,
    "createdAt": "2025-11-15T22:00:00.000Z",
    "updatedAt": "2025-11-15T22:15:00.000Z"
  },
  "status": 200
}
```

---

### 6. DELETE USER (DELETE /users/:id)

#### Success Case
```bash
curl -X DELETE http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000

Response (200):
{
  "success": true,
  "message": "User deleted successfully",
  "status": 200
}
```

#### Error Cases

**User Already Deleted**
```bash
curl -X DELETE http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000

Response (404):
{
  "success": false,
  "error": "User not found",
  "status": 404
}
```

---

## Error Code Reference

| Status | Code | Meaning |
|--------|------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input, validation failed |
| 404 | Not Found | Resource does not exist |
| 405 | Method Not Allowed | HTTP method not supported |
| 500 | Internal Server Error | Server error |

---

## Validation Rules

### Email Validation
- Format: user@domain.com
- Must contain @ and .
- No spaces allowed
- Regex: ^[^\s@]+@[^\s@]+\.[^\s@]+$

### Age Validation
- Type: Integer
- Range: 1 - 149
- Cannot be negative or zero
- Cannot be 150 or above

### Name Validation
- Type: String
- Min length: 1 character
- Max length: 100 characters
- Cannot be empty or only whitespace
- Leading/trailing spaces trimmed

### UUID Validation
- Format: RFC 4122
- Pattern: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
- Case-insensitive
- Must be 36 characters with hyphens

---

## Unit Test Examples

### Node.js (Jest)
```javascript
describe('User CRUD API', () => {
  test('Create user with valid data', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        age: 25
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBeDefined();
  });

  test('Get user that does not exist', async () => {
    const response = await request(app)
      .get('/users/invalid-id');

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Invalid');
  });
});
```

---

## Performance Considerations

### Time Complexity
- Create: O(n) - for duplicate email check
- Read Single: O(1) - HashMap lookup
- Read All: O(n) - iterate all entries
- Update: O(n) - for duplicate email check
- Delete: O(1) - HashMap removal

### Space Complexity
- O(n) - for storing n users

### Optimization Tips
1. Use indexing for email lookups (secondary index)
2. Implement caching for frequently accessed users
3. Add pagination for GET /users endpoint
4. Consider rate limiting
5. Add request logging

---

## Example Test Data

```javascript
const testUsers = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    age: 28
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    age: 35
  },
  {
    name: "Carol Davis",
    email: "carol@example.com",
    age: 42
  },
  {
    name: "David Wilson",
    email: "david@example.com",
    age: 31
  },
  {
    name: "Eve Martinez",
    email: "eve@example.com",
    age: 26
  }
];
```

---

## Security Considerations

- Input validation on all fields
- Email uniqueness enforced
- UUID format validation
- Age range validation
- Add authentication/authorization
- Add rate limiting
- Add request logging
- Add CORS validation
- Add request size limits
- Sanitize error messages

---

## Setup & Running

### Node.js
```bash
npm install
npm start
```

---

Last Updated: November 2025
Version: 1.0.0
