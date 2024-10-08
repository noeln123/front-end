import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../Resource/Css/viet-all.css';
import { HeaderMenu } from "../Component/Menu";
import Footer from "../Component/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';

const CheckOutSuccess = () => {
    const [productId, setProductId] = useState(null);
    const [price, setPrice] = useState(null);
    const [error, setError] = useState(null);
    const [productName, setProductName] = useState(null);

  
    useEffect(() => {
      const fetchLatestTransaction = async () => {
        try {
           let token = localStorage.getItem('token');
          const response = await fetch('http://localhost:8080/api/transaction/my-lastest-transaction',{
            method: "GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (data.code === 1000) {
            setProductId(data.result.productId);
          } else {
            throw new Error('Invalid response code');
          }
        } catch (error) {
          setError('Failed to fetch transaction data');
          console.error(error);
        }
      }
      const fetchProductInfo = async () => {
        try {
           let token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:8080/api/course/${productId}`,{
            method: "GET"
          });
          const data = await response.json();
          if (data.code === 1000) {
            setPrice(data.result.price);
            setProductName(data.result.title);
          } else {
            throw new Error('Invalid response code');
          }
        } catch (error) {
          setError('Failed to fetch transaction data');
          console.error(error);
        }
      };
  
      fetchLatestTransaction();
      fetchProductInfo();
    }, []);
  
    return (
        <>
            <HeaderMenu />
            <div className="checkout-success-container">
                <div className="success-message">
                    <i className="fa-solid fa-circle-check" style={{fontSize:"100px", color:"green", paddingBottom:"40px"}}></i>
                    <h1>Congratulations on Purchasing the Course!</h1>
                    <p>Your course purchase was successful.</p>
                    <p>Course Name: <strong>{productName}</strong></p>
                    <p>Price: <strong>{price}$</strong></p>
                    <Link className="btn btn-primary" to={`/coursevideo/${productId}`}>Start Learning Now</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CheckOutSuccess;
