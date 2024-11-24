const User = require('../models/user');
const bcrypt = require('bcrypt');

// Signup Handler
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
// Check if the user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Create the user
        await User.create(username, email, password);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Signin Handler
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
// Find user by email
        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'Email not found. Please sign up.' });
        }

// Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        res.status(200).json({ message: 'Sign in successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
