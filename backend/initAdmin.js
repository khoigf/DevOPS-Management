const mongoose = require('mongoose');
const User = require('./src/models/User'); // Đường dẫn đến model User
require('dotenv').config();

const initAdmin = async () => {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Kiểm tra xem tài khoản admin đã tồn tại chưa
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin account already exists.');
      return;
    }

    // Tạo tài khoản admin
    const admin = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123', // Lưu ý: Nên sử dụng mật khẩu mạnh hơn.
      role: 'admin',
    });

    await admin.save();
    console.log('Admin account created successfully.');
  } catch (err) {
    console.error('Error initializing admin account:', err.message);
  }
};

module.exports = initAdmin;
