import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Resource/Css/viet-all.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { HeaderMenu } from '../Component/Menu';
import Footer from '../Component/Footer';


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
                console.log(response.data.result.token);

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
        <>
            <HeaderMenu />
            <div>
                <div className="body-1">
                    <h1>Welcome back!</h1>
                    <div className="text">
                        <p>Hey there! Ready to login? Just enter your username and password below and you'll be back in action in no time.
                            Let's go!</p>
                        <div className="with-gg">
                            <button className="btn-gg">
                                <img src="https://i.pinimg.com/736x/74/65/f3/7465f30319191e2729668875e7a557f2.jpg" alt="" />
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
                                <label for="">User Name</label>
                                <input className="create-account" type="text" placeholder="User Name" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="password">
                                <label for="">Password</label>
                                <input className="create-account" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="forgot-pass">
                                <div>
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </div>
                                <div>
                                    <Link to={"/forgotPass"}>Forgot password?</Link>
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
            <Footer />
        </>
    );
};

export default Login;
