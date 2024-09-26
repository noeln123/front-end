import React, { useState } from 'react';
import '../Resource/Css/tuan-all.css'; // Thêm file CSS cho style
import { HeaderMenu } from '../Component/Menu';
import Footer from '../Component/Footer';

const AccountInfo = () => {
  // State để lưu thông tin cá nhân
  const [userInfo, setUserInfo] = useState({
    username: 'Kingg',
    fullName: 'Jeremy Rose',
    phone: '+1 123 456 7890',
    address: '525 E 68th Street, New York, NY, 10065',
    email: 'hello@jeremyrose.com',
    website: 'www.jeremyrose.com',
    avatar: 'path_to_avatar_image',
  });

  // State để quản lý chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false); // Quản lý việc hiển thị nút và input file

  // Hàm để thay đổi avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewAvatar(reader.result); // Hiển thị avatar mới
      };
      reader.readAsDataURL(file);
      setIsEditingAvatar(false); // Ẩn input sau khi chọn ảnh
    }
  };

  // Hiển thị nút chỉnh sửa khi nhấn vào avatar
  const handleAvatarClick = () => {
    setIsEditingAvatar(true); // Hiển thị nút chỉnh sửa
  };

  return (
    <>
      <HeaderMenu />
      <div className="account-container">
        <div className="account-left">
          <div className='avt-profile'>
            <img
              src="/viet-img/anh_tay.jpg"
              alt="Avatar"
              className="avatar"
              onClick={handleAvatarClick} // Bấm vào để hiển thị nút chỉnh sửa
            />
            <span>{userInfo.username}</span>
            {isEditingAvatar && (
              <button
                className="edit-avatar-button"
                onClick={() => document.getElementById('avatar-input').click()}
              >
                Chỉnh sửa
              </button>
            )}
            <input
              type="file"
              id="avatar-input"
              style={{ display: 'none' }} // Ẩn input file
              onChange={handleAvatarChange}
              accept="image/*"
            />
          </div>
          <div className="personal-info">
            <h3 style={{ textAlign: 'center' }}>Basic Information</h3>
            <p><strong>Birthday:</strong> June 5, 1992</p>
            <p><strong>Gender:</strong> Male</p>
          </div>
        </div>

        <div className="account-right">
          {isEditing ? (
            <div className="contact-info">
              <h3>Edit Contact Information</h3>
              <p>
                <strong>Full Name:</strong>
                <input
                  type="text"
                  name="fullName"
                  value={userInfo.fullName}
                  onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                />
              </p>
              <p>
                <strong>Phone:</strong>
                <input
                  type="text"
                  name="phone"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                />
              </p>
              <p>
                <strong>Address:</strong>
                <input
                  type="text"
                  name="address"
                  value={userInfo.address}
                  onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                />
              </p>
              <p>
                <strong>Email:</strong>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                />
              </p>
              <p>
                <strong>Website:</strong>
                <input
                  type="text"
                  name="website"
                  value={userInfo.website}
                  onChange={(e) => setUserInfo({ ...userInfo, website: e.target.value })}
                />
              </p>
              <button onClick={() => setIsEditing(false)}>Save</button>
            </div>
          ) : (
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p><strong>Full Name:</strong> {userInfo.fullName}</p>
              <p><strong>Phone:</strong> {userInfo.phone}</p>
              <p><strong>Address:</strong> {userInfo.address}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>Website:</strong> {userInfo.website}</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountInfo;
