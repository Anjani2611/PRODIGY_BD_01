# PRODIGY_BD_01
REST API with CRUD operations for users management.

# Users REST API - CRUD Operations

A fully functional REST API simulator built with vanilla JavaScript and HTML/CSS, demonstrating basic CRUD (Create, Read, Update, Delete) operations on a users resource.

##  Features

-  **Create** - Add new users with UUID auto-generation
-  **Read** - Fetch single user or all users
-  **Update** - Edit existing user information
-  **Delete** - Remove users from storage
-  **Validation** - Email format, age range, required fields
-  **In-Memory Storage** - HashMap-based data structure
-  **Responsive Design** - Works on all devices
-  **JSON API Responses** - View API response format

##  User Object Structure

{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "createdAt": "2025-12-15T02:25:00.000Z"
}
##  HTTP Status Codes

| Code | Description |
|------|-------------|
| **201** | User created successfully |
| **200** | Request successful (read/update/delete) |
| **400** | Bad request (validation error) |
| **404** | User not found |

##  Validation Rules

- **Name**: Required, non-empty string
- **Email**: Valid email format, must be unique
- **Age**: Number between 1-120
- **UUID**: Auto-generated for each user (RFC 4122 v4)

##  How to Use

### Creating a User
1. Fill in the form fields:
   - **Name**: User's full name
   - **Email**: Valid email address
   - **Age**: Number between 1-120
2. Click **"Create User"** button
3. View API response showing 201 status and user data
4. Form resets automatically

### Viewing All Users
1. Click **"Fetch All Users"** button
2. Users displayed in table format
3. See ID (truncated), Name, Email, Age, and Actions
4. Each row has Edit and Delete buttons

### Searching for a User
1. Enter user ID in search field
2. Click **"Search"** button
3. View API response showing user details or 404 error
4. Response displays in JSON format

### Editing a User
1. Click **"Edit"** button next to user in table
2. Form populates with user's current data
3. Modify any fields (Name, Email, Age)
4. Click **"Update User"** button
5. View 200 status response with updated data

### Deleting a User
1. Click **"Delete"** button next to user
2. Confirm deletion in popup dialog
3. View 200 status response
4. User removed from table and stats updated

### Resetting Form
- Click **"Reset Form"** button to clear all fields
- Button label reverts to "Create User"

##  API Endpoints (Simulated)


POST   /api/users          - Create new user
GET    /api/users          - Get all users
GET    /api/users/{id}     - Get specific user
PUT    /api/users/{id}     - Update user
DELETE /api/users/{id}     - Delete user


##  Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: In-Memory HashMap (JavaScript Map)
- **Architecture**: Client-side only, no backend required
- **No Dependencies**: Pure vanilla implementation

##  Project Structure

users-rest-api/
├── index.html          # Main application (HTML + CSS + JS)
├── README.md           # Documentation
└── .gitignore          # Git ignore rules (optional)


##  Getting Started

### Option 1: Online (GitHub Pages)
1. Open: `https://yourusername.github.io/users-rest-api`
2. Start creating users immediately!

### Option 2: Local
1. Download `index.html`
2. Open in any web browser
3. No server or dependencies required!

##  Features Breakdown

### Data Persistence
- Data stored in JavaScript `Map` object
- Lives in browser memory during session
- **Note**: Data resets on page refresh (for demo purposes)

### Form Validation
- Required field checking
- Email format validation (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Age range validation (1-120)
- Duplicate email prevention
- Real-time error messages

### User Interface
- Gradient header with styling
- Card-based layout
- Responsive grid (adapts to mobile)
- Status messages (success/error/info)
- JSON response display
- Statistics card showing total users
- Hover effects on table rows
- Smooth scrolling on edit

### API Response Format
{
  "status": 201,
  "message": "User created successfully",
  "data": {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "createdAt": "2025-12-15T02:25:00.000Z"
  }
}

##  Learning Resources

This project demonstrates:
- RESTful API design principles
- CRUD operations implementation
- Form validation techniques
- DOM manipulation and event handling
- JSON serialization and deserialization
- UUID generation (RFC 4122 v4)
- State management with HashMap/Map
- Error handling patterns
- HTTP status codes
- Client-side data persistence

##  Future Enhancements

- [ ] Backend API integration (Node.js/Express/Python)
- [ ] Database persistence (MongoDB/PostgreSQL/MySQL)
- [ ] Authentication & Authorization (JWT)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit tests (Jest/Mocha)
- [ ] Error handling improvements
- [ ] Pagination for large datasets
- [ ] Search and filter functionality
- [ ] Sorting by columns
- [ ] Bulk operations (import/export CSV)
- [ ] Dark mode support
- [ ] Rate limiting simulation

## Security Notes

**Current Implementation (Demo Only):**
-  No backend validation
-  No authentication
-  No data encryption
-  Client-side only

**For Production Use:**
- Add backend validation
- Implement authentication (OAuth/JWT)
- Use HTTPS
- Validate input on server
- Use secure database
- Implement CORS properly
- Add rate limiting

## License

MIT License - Feel free to use this for learning purposes, portfolio projects, or educational demonstrations.

## Author

Created as part of BTech coursework on Backend Development & REST APIs

Contributing

This is a learning project. Feel free to fork and enhance with additional features!

Important Notes

- **Data Reset**: All data clears on page refresh (in-memory only)
- **No Persistence**: For persistent storage, integrate a backend database
- **Single User**: Each browser session is independent
- **Client-Side Only**: All operations happen in your browser

 Support

For questions or issues:
1. Check the code comments
2. Review error messages in the UI
3. Test with sample data
4. Read the API response format
