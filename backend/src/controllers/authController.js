const User = require('../models/User'); // Giả định User là model MongoDB
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Kiểm tra input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Kiểm tra email đã tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Tạo người dùng mới
        const newUser = new User({ username, email, password: password, role });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in register:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm người dùng theo username
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username' });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Tạo JWT
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        return res.status(200).json({
            userId: user._id,
            name: user.username,
            email: user.email,
            role: user.role,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const logout = async (req, res) => {
  try {
    // Trả về trạng thái thành công để client xóa token
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ error: 'Logout failed' });
  }
};

module.exports = { register, login, logout };
