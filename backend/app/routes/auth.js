
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const config = require('../core/config');

const router = express.Router();
const saltRounds = 10;

// In-memory store for password reset tokens. In production, use Redis or a database table.
const passwordResetTokens = {};

router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  try {
    const existingUser = await userModel.findUserByEmail(email) || await userModel.findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email or username already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = await userModel.createUser(username, email, passwordHash, role);

    // Omit password_hash from the response
    const { password_hash, ...userToSend } = newUser;
    res.status(201).json({ message: 'User created successfully', user: userToSend });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error during signup.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      config.jwtSecret,
      { expiresIn: '24h' }
    );
    
    // Omit password_hash from user object in response
    const { password_hash, ...userToSend } = user;

    res.json({ message: 'Login successful', token, user: userToSend });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error during login.' });
  }
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    const user = await userModel.findUserByEmail(email);
    if (!user) {
        // Still send a success message to prevent user enumeration attacks
        return res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
    }

    // Generate a secure, random token
    const token = require('crypto').randomBytes(32).toString('hex');
    const expires = Date.now() + 3600000; // 1 hour expiration

    passwordResetTokens[token] = { email: user.email, expires };
    
    // In a real application, you would send an email here
    const resetLink = `http://yourapp.com/reset-password?token=${token}`;
    console.log(`Password reset link for ${user.email}: ${resetLink}`);

    res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
});

router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required.' });
    }

    const tokenData = passwordResetTokens[token];
    if (!tokenData || tokenData.expires < Date.now()) {
        return res.status(400).json({ message: 'Token is invalid or has expired.' });
    }

    try {
        const passwordHash = await bcrypt.hash(newPassword, saltRounds);
        await userModel.updateUserPassword(tokenData.email, passwordHash);
        
        // Invalidate the token after use
        delete passwordResetTokens[token];

        res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Internal server error during password reset.' });
    }
});


module.exports = router;
