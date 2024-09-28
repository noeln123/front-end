import React, { useState } from 'react';
import axios from 'axios';
import '../Resource/Css/viet-all.css';
import { HeaderMenu } from "../Component/Menu";
import Footer from "../Component/Footer";
import { useNavigate } from 'react-router-dom';  

const CheckPin = () => {
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng

    // Kiểm tra email hợp lệ từ server
    const checkEmail = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/user/reset-password', { email: email });
            if (response.data.code === 1000) {
                return true;  // Email hợp lệ
            } else {
                setMessage(`Email không hợp lệ: ${response.data.message}`);
                return false;
            }
        } catch (error) {
            console.error('Error during email check', error);
            setMessage('Lỗi kiểm tra email. Vui lòng thử lại sau.');
            return false;
        }
    };

    // Hàm xử lý khi người dùng nhấn submit để kiểm tra mã PIN và đặt lại mật khẩu
    const handleResetPassword = async (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp không
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }

        // Kiểm tra xem email có hợp lệ hay không
        // const isEmailValid = await checkEmail();
        // if (!isEmailValid) {
        //     return;  // Nếu email không hợp lệ thì dừng lại
        // }

        // Gửi yêu cầu đặt lại mật khẩu với mã PIN
        try {
            const response = await axios.post('http://localhost:8080/api/user/reset-password', { 
                email: email,
                code: pin, 
                newPassword: newPassword 
            });

            if (response.data.code === 1000) {
                setMessage('Mật khẩu đã được thay đổi thành công.');
                // Điều hướng đến trang đăng nhập sau khi thành công
                navigate('/password-change-success');
            } else {
                setMessage(`Error: ${response.data.message}`);
            }
        } catch (error) {
            if (error.response) {
                setMessage(`Error ${error.response.status}: ${error.response.data.message}`);
            } else {
                console.error('Error during password reset', error);
                setMessage('Failed to reset password. Please try again later.');
            }
        }
    };

    return (
        <>
            <HeaderMenu />
            <div className="body-password">
                <div className="img-pass">
                    <img src="/viet-img/forgotpass.png" alt="Reset Password" />
                </div>
                <div className="newpass">
                    <div className="form-pass">
                        <h1>Reset Password</h1>
                        <p>Please enter the PIN sent to your email along with your new password.</p>

                        <form onSubmit={handleResetPassword}>
                            <input
                                type="email"
                                className="input-group"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                className="input-pin"
                                placeholder="Enter PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="input-group"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="input-group"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button className="btn-newpass" type="submit">Submit</button>
                        </form>

                        {/* Hiển thị thông báo */}
                        <p>{message}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CheckPin;
