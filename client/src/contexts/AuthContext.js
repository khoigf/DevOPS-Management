import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
    
  const [tokens, setTokens] = useState(() => {
    const savedTokens = localStorage.getItem('tokens');
    return savedTokens ? JSON.parse(savedTokens) : null;
  });

  // Hàm đăng nhập
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/login',
        { email, password }, // Đúng cấu trúc request body
        { withCredentials: true } // Gửi thông tin xác thực nếu backend yêu cầu
      );

      // Cập nhật user và token
      const { userId, name, role, accessToken, refreshToken } = response.data;
      const mail = response.data.email;
      const userData = { userId, name, role, mail };
      const tokenData = { accessToken, refreshToken };

      setUser(userData);
      setTokens(tokenData);

      // Lưu vào localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('tokens', JSON.stringify(tokenData));

      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  // Hàm đăng ký
  const register = async (userData) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/register',
        userData, // Gửi đúng cấu trúc request body
        { withCredentials: true }
      );

      console.log(response.data.message); // Log phản hồi từ backend
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  // Hàm đăng xuất
  const logout = async () => {
    await axios.post('http://localhost:5000/auth/logout');
    setUser(null);
    setTokens(null);

    // Xóa khỏi localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('tokens');
  };

  return (
    <AuthContext.Provider value={{ user, tokens, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
