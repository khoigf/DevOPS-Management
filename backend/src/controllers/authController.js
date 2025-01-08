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

        // Tạo token JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role }, // Payload
            process.env.JWT_SECRET,               // Secret key
            { expiresIn: '12h' }                   // Token hết hạn sau 12 giờ
        );

        return res.status(200).json({
            userId: user._id,
            name: user.username,
            email: user.email,
            role: user.role,
            accessToken: token,
            refreshToken: token,
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

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        // Kiểm tra mật khẩu cũ
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect old password' });

        user.password = newPassword;

        await user.save();
        res.status(200).json({ message: 'Password updated successfully!' });
    }catch (error) {
        console.error('Error in changePassword:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { 
    register, 
    login, 
    logout,
    changePassword,
};
