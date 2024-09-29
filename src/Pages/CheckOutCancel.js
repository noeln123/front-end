import React, { useState } from 'react';
import '../Resource/Css/viet-all.css';
import { HeaderMenu } from "../Component/Menu";
import Footer from "../Component/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const CheckOutCancel = () => {
    return (
        <>
            <HeaderMenu />
            <div className="checkout-cancel-container">
                <div className="cancel-message">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <h1>Payment Failed</h1>
                    <p>Unfortunately, your payment for the course could not be processed.</p>
                    <p>Please check your payment details or try again later.</p>
                    <button className="btn-retry">Retry Payment</button>
                    <button className="btn btn-backtocourse"><Link to={"/courses"}>Back to Courses</Link></button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CheckOutCancel;
