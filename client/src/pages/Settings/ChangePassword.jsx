import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import '../../assets/styles/AdminDashboard.css';
import { API_BASE_URL } from '../../utils/apiConfig';

const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const getAccessToken = () => {
    const tokens = JSON.parse(localStorage.getItem('tokens')); // Lưu ý: tokens phải lưu JSON object chứa accessToken
    return tokens?.accessToken || '';
  };
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validate and call the API for changing password
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirmation do not match!');
      return;
    }

    const token = getAccessToken();
    console.log('Token:', token);
    try {
        const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Thêm token nếu cần
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Nếu đổi mật khẩu thành công, xóa token và logout
          localStorage.removeItem('tokens'); // Xóa token trong localStorage
          setMessage('Password changed successfully! Logging out...');
        
          // Chờ 2 giây để hiển thị thông báo sau đó chuyển hướng về login
          setTimeout(() => {
            navigate('/'); // Điều hướng tới trang đăng nhập
          }, 2000);
        } else {
          setMessage(data.message || 'Error changing password.');
        }
    } catch (error) {
        setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-main">
        <Sidebar />
        <div className="dashboard-settings">
          <div className="settings-card">
            <h1>Settings</h1>
            {message && <p className="message">{message}</p>}
            <form className="settings-form" onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label htmlFor="old-password">Old Password</label>
                <input
                  type="password"
                  id="old-password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm New Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-change-password">Change Password</button>
            </form>
          </div>
        </div>
        </div>
    </div>
  );
};

export default SettingsPage;