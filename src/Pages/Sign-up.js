import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Resource/Css/viet-all.css';
import { HeaderMenu } from '../Component/Menu';
import Footer from '../Component/Footer';

const SignUp = () => {
    // Sử dụng useState để lưu trữ thông tin từ form
    const [fullName, setFullName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password_hash, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault(); // Ngăn form reload lại trang

        // Kiểm tra xem mật khẩu có khớp không
        if (password_hash !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        // Tạo object chứa thông tin người dùng
        const newUser = {
            fullName,
            username,
            email,
            password_hash,
        };


        // Gửi thông tin đăng ký tới API backend (thay đổi URL này theo hệ thống của bạn)
        const response = await fetch('http://localhost:8080/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            // Đăng ký thành công, chuyển hướng tới trang đăng nhập
            navigate('/login');
        } else {
            const data = await response.json();
            setErrorMessage(data.message || 'Registration failed!');
        }

    };

    return (
        <>
            <HeaderMenu/>
            <div className="body-1">
                <h1>Create Your Account</h1>
                <div className="text">
                    <p>
                        Hey there! Ready to join the party? We just need a few details from you to get started. Let's do this!
                    </p>
                    <div className="with-gg">
                        <button className="btn-gg">
                            <img src="https://i.pinimg.com/736x/74/65/f3/7465f30319191e2729668875e7a557f2.jpg" alt="Google" />
                            <span>Continue with Google</span>
                        </button>
                    </div>
                </div>

                <div className="divider">
                    <span>or</span>
                </div>

                {/* Form đăng ký */}
                <form onSubmit={handleSignUp}>
                    <div className="email">
                        <label>Full Name</label>
                        <input
                            className="create-account"
                            style={{margin:'0', width:'100%'}}
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="email">
                        <label>UserName</label>
                        <input
                            className="create-account"
                            type="username"
                            name="username"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="email">
                        <label>Email</label>
                        <input
                            className="create-account"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="password">
                        <label>Password</label>
                        <input
                            className="create-account"
                            type="password"
                            placeholder="Password"
                            value={password_hash}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="confirm">
                        <label>Confirm Password</label>
                        <input
                            className="create-account"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    <button type="submit" className="button-signup">
                        Sign Up
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </form>

                <div className="inlogin">
                    <span>Already have an account? </span>
                    <Link to="/login">Login</Link>
                </div>
            </div>
            <Footer/>
        </>
    );
};


export default SignUp;
