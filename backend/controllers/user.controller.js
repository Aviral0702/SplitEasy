import User from "../models/User.model.js";
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
    console.log('Register route hit');
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create the user (password will be hashed automatically in the model)
        const user = await User.create({
            username,
            email,
            password  // No need to hash here, model handles it
        });

        // Generate a JWT token
        const token = generateToken(user._id);

        // Respond with the token and user info
        res.status(201).json({ token, user });

    } catch (error) {
        console.error('Error during registration:', error.message);  // Log the error
        res.status(500).json({ message: 'Failed to create user' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login route hit');

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the password matches
        const isMatch = await user.matchPassword(password);  // Call matchPassword on the user instance

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = generateToken(user._id);

        // Respond with the token and user info
        res.json({ token, user });

    } catch (error) {
        console.error('Error during login:', error.message);  // Log the error for debugging
        res.status(500).json({ message: "Failed to login user" });
    }
};


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}