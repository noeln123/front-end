import React, { useState } from 'react';
import '../Resource/Css/viet-all.css';
import { HeaderMenu } from "../Component/Menu";
import Footer from "../Component/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';

const CheckOutSuccess = () => {
    return (
        <>
            <HeaderMenu />
            <div className="checkout-success-container">
                <div className="success-message">
                    <i class="fa-solid fa-circle-check" style={{fontSize:"100px", color:"green", paddingBottom:"40px"}}></i>
                    <h1>Congratulations on Purchasing the Course!</h1>
                    <p>Your course purchase was successful.</p>
                    <p>Course Name: <strong>Full Stack Web Development</strong></p>
                    <p><strong>Price: 30$</strong></p>
                    <button className="btn btn-primary">Start Learning Now</button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CheckOutSuccess;
