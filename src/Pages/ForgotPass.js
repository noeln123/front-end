import React, { useState } from 'react';
import axios from 'axios';
import '../Resource/Css/viet-all.css';
import { HeaderMenu } from "../Component/Menu";
import Footer from "../Component/Footer";
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/user/forgot-password', { email: email });

            if (response.data.code === 1000) {
                setMessage('A reset link has been sent to your email.');
                // Điều hướng sang trang Check Mã pin sau khi thành công
                
                navigate('/checkPin');
            } else {
                setMessage(`Error: ${response.data.message}`);
            }
        } catch (error) {
            if (error.response) {
                setMessage(`Error ${error.response.status}: ${error.response.data.message}`);
            } else {
                console.error('Error during password reset', error);
                setMessage('Failed to send reset email. Please try again later.');
            }
        }
    };

    return (
        <>
            <HeaderMenu />
            <div className="body-password">
                <div className="img-pass">
                    <img src="/viet-img/forgotpass.png" alt="Forgot Password" />
                </div>
                <div className="newpass">
                    <div className="form-pass">
                        <h1>Forgot Password</h1>
                        <p>We'll email you a link so you can reset your password.</p>

                        <form onSubmit={handleForgotPassword}>
                            <input
                                type="email"
                                className="input-group"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button className="btn-newpass" type="submit">Reset Password</button>
                        </form>

                        {/* Hiển thị thông báo phản hồi từ server */}
                        <p>{message}</p>

                        <div>
                            <Link to={"/login"}>or login</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ForgotPass;
