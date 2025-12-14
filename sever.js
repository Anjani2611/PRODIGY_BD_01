const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

// Middleware
app.use(express.json());

// ============ IN-MEMORY DATA STORAGE ============
const users = new Map(); // HashMap for O(1) access

// ============ VALIDATION FUNCTIONS ============

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate age
 * @param {number} age - Age to validate
 * @returns {boolean} - True if age is valid
 */
function isValidAge(age) {
    return Number.isInteger(age) && age > 0 && age < 150;
}

/**
 * Validate name
 * @param {string} name - Name to validate
 * @returns {boolean} - True if name is valid
 */
function isValidName(name) {
    return typeof name === 'string' && name.trim().length > 0 && name.length <= 100;
}

/**
 * Validate user object
 * @param {object} user - User object to validate
 * @param {boolean} isUpdate - Whether this is an update (id not required)
 * @returns {object} - { valid: boolean, error: string }
 */
function validateUser(user, isUpdate = false) {
    if (!isUpdate && !user.name) {
        return { valid: false, error: 'Name is required' };
    }

    if (!isUpdate && !user.email) {
        return { valid: false, error: 'Email is required' };
    }

    if (!isUpdate && !user.age) {
        return { valid: false, error: 'Age is required' };
    }

    if (user.name !== undefined && !isValidName(user.name)) {
        return { valid: false, error: 'Name must be a non-empty string (max 100 chars)' };
    }

    if (user.email !== undefined && !isValidEmail(user.email)) {
        return { valid: false, error: 'Invalid email format' };
    }

    if (user.age !== undefined && !isValidAge(user.age)) {
        return { valid: false, error: 'Age must be a number between 1 and 149' };
    }

    return { valid: true };
}

// ============ CREATE USER - POST /users ============
app.post('/users', (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Validate input
        const validation = validateUser({ name, email, age });
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                error: validation.error,
                status: 400
            });
        }

        // Check if email already exists
        for (let user of users.values()) {
            if (user.email.toLowerCase() === email.toLowerCase()) {
                return res.status(400).json({
                    success: false,
                    error: 'Email already exists',
                    status: 400
                });
            }
        }

        // Create new user
        const userId = uuidv4();
        const newUser = {
            id: userId,
            name: name.trim(),
            email: email.toLowerCase(),
            age,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        users.set(userId, newUser);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser,
            status: 201
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            status: 500
        });
    }
});

// ============ READ ALL USERS - GET /users ============
app.get('/users', (req, res) => {
    try {
        // Convert Map to Array
        const allUsers = Array.from(users.values());

        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: allUsers,
            count: allUsers.length,
            status: 200
        });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            status: 500
        });
    }
});

// ============ READ SINGLE USER - GET /users/:id ============
app.get('/users/:id', (req, res) => {
    try {
        const { id } = req.params;

        // Validate UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid user ID format',
                status: 400
            });
        }

        // Get user from HashMap
        const user = users.get(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
                status: 404
            });
        }

        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: user,
            status: 200
        });
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            status: 500
        });
    }
});

// ============ UPDATE USER - PUT /users/:id ============
app.put('/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;

        // Validate UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid user ID format',
                status: 400
            });
        }

        // Check if user exists
        const user = users.get(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
                status: 404
            });
        }

        // Validate update data
        const validation = validateUser({ name, email, age }, true);
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                error: validation.error,
                status: 400
            });
        }

        // Check if new email already exists (if email is being updated)
        if (email && email.toLowerCase() !== user.email.toLowerCase()) {
            for (let otherUser of users.values()) {
                if (otherUser.email.toLowerCase() === email.toLowerCase()) {
                    return res.status(400).json({
                        success: false,
                        error: 'Email already exists',
                        status: 400
                    });
                }
            }
        }

        // Update user fields
        if (name) user.name = name.trim();
        if (email) user.email = email.toLowerCase();
        if (age) user.age = age;
        user.updatedAt = new Date().toISOString();

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user,
            status: 200
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            status: 500
        });
    }
});

// ============ PATCH USER - PATCH /users/:id ============
app.patch('/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Validate UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid user ID format',
                status: 400
            });
        }

        // Check if user exists
        const user = users.get(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
                status: 404
            });
        }

        // Validate update data (partial update)
        const validation = validateUser(updates, true);
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                error: validation.error,
                status: 400
            });
        }

        // Apply partial updates
        if (updates.name !== undefined) user.name = updates.name.trim();
        if (updates.email !== undefined) {
            if (updates.email.toLowerCase() !== user.email.toLowerCase()) {
                for (let otherUser of users.values()) {
                    if (otherUser.email.toLowerCase() === updates.email.toLowerCase()) {
                        return res.status(400).json({
                            success: false,
                            error: 'Email already exists',
                            status: 400
                        });
                    }
                }
            }
            user.email = updates.email.toLowerCase();
        }
        if (updates.age !== undefined) user.age = updates.age;
        user.updatedAt = new Date().toISOString();

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user,
            status: 200
        });
    } catch (error) {
        console.error('Error patching user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            status: 500
        });
    }
});

// ============ DELETE USER - DELETE /users/:id ============
app.delete('/users/:id', (req, res) => {
    try {
        const { id } = req.params;

        // Validate UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid user ID format',
                status: 400
            });
        }

        // Check if user exists
        if (!users.has(id)) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
                status: 404
            });
        }

        // Delete user
        users.delete(id);

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            status: 200
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            status: 500
        });
    }
});

// ============ HEALTH CHECK ============
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running',
        status: 200,
        timestamp: new Date().toISOString()
    });
});

// ============ 404 HANDLER ============
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        status: 404
    });
});

// ============ ERROR HANDLER ============
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        status: 500
    });
});

// ============ START SERVER ============
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`User CRUD API running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
