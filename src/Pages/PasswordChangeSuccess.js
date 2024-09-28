import React from 'react';
import '../Resource/Css/viet-all.css'; 
import { useNavigate } from 'react-router-dom'; 
import { HeaderMenu } from "../Component/Menu"; 
import Footer from "../Component/Footer"; 

const PasswordChangeSuccess = () => {
    const navigate = useNavigate(); 

    // Hàm để quay lại trang đăng nhập
    const handleGoToLogin = () => {
        navigate('/login');
    };

    return (
        <>
            <HeaderMenu /> {/* Header nếu có */}
            <div className="body-password">
                <div className="newpass">
                    <div className="form-pass">
                        <h1>Password Changed Successfully</h1>
                        <p>Your password has been changed successfully.</p>
                        <p>You can now use your new password to log in.</p>

                        {/* Nút quay lại trang đăng nhập */}
                        <button className="btn-newpass" onClick={handleGoToLogin}>Go to Login</button>
                    </div>
                </div>
            </div>
            <Footer /> {/* Footer nếu có */}
        </>
    );
};

export default PasswordChangeSuccess;
