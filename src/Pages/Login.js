import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Resource/Css/viet-all.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/token', {
                username: username,
                password: password
            });

            if (response.data.code === 1000) {
                localStorage.setItem('token', response.data.result.token);
                navigate('/');
            } else {
                alert(`Code: ${response.data.code} \n Msg: ${response.data.message}`);
            }
        } catch (error) {
            if (error.response) {
                alert(`Error ${error.response.status}: ${error.response.data.code} ${error.response.data.message}`);
            } else {
                console.error('Error during login', error);
                alert('Login failed');
            }
        }
    };

    return (
            <div>
            <section className="section">
                <div className="container">
                <div className="inner-container">
                    <img className="breadcrumb-shape01svg-icon" loading="lazy" alt="" src="/viet-img/breadcrumb-shape01svg.svg" />

                    <div className="inner-container1">
                    <div className="inner-container2">
                        <h1 className="heading-3">Student Login</h1>
                        <nav className="home-contact-nav">
                        <a className="nav-link">Home</a>
                        <div className="inner-container3">
                            <i className="fa-solid fa-angle-right" style={{ color: 'rgba(127, 126, 151, 0.5)' }}></i>
                        </div>
                        <a className="nav-contact">Login</a>
                        </nav>
                    </div>
                    </div>
                </div>
                </div>
                <div className="container1">
                <div className="inner-container4">
                    <img className="breadcrumb-shape02svg-icon" loading="lazy" alt="" src="/viet-img/breadcrumb-shape02svg.svg" />
                </div>
                <div className="inner-container5">
                    <img className="breadcrumb-shape04svg-icon" loading="lazy" alt="" src="/viet-img/breadcrumb-shape04svg.svg" />
                    <div className="inner-container6">
                    <img className="breadcrumb-shape03svg-icon" loading="lazy" alt="" src="/viet-img/breadcrumb-shape03svg.svg" />
                    </div>
                    <img className="breadcrumb-shape05svg-icon" alt="" src="/viet-img/breadcrumb-shape05svg.svg" />
                </div>
                </div>
            </section>
            <div className="body-1">
                <h1>Welcome back!</h1>
                <div className="text">
                <p>Hey there! Ready to login? Just enter your username and password below and you'll be back in action in no time.
                    Let's go!</p>
                <div className="with-gg">
                    <button className="btn-gg">
                    <img src="https://i.pinimg.com/736x/74/65/f3/7465f30319191e2729668875e7a557f2.jpg" alt=""/>
                    <span>
                        Continue with google
                    </span>
                    </button>
                </div>
                </div>
                <div className="divider">
                <span>or</span>
                </div>
                <div>
                <form onSubmit={handleLogin}>
                    <div className="email">
                        <label for="">Email</label>
                        <input className="create-account" type="text" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div className="password">
                        <label for="">Password</label>
                        <input className="create-account" type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="forgot-pass">
                        <div>
                        <input type="checkbox"/>
                        <span>Remember me</span>
                        </div>
                        <div>
                        <a href="">Forgot password?</a>
                        </div>
                    </div>
                    <button className="button-signup" type="submit">
                        Sign In
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                    <div className="inlogin">
                        <span>Don't have an account? </span><a href=""> Sign Up</a>
                    </div>
                </form>
                </div>
            </div>
            </div>
    );
};

export default Login;
