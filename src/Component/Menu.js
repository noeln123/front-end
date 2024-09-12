import React, { useEffect, useState } from 'react';
import axios from 'axios';



const HeaderMenu = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
          axios.get('http://localhost:8080/api/user/myinfo', {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          .then(response => {
              if (response.status === 200 && response.data.code === 1000) {
                  setUserInfo(response.data.result);
              }
          })
          .catch(error => {
              if (error.response && error.response.status === 401) {
                  // Token không hợp lệ hoặc hết hạn, không làm gì cả
              } else {
                  console.error('Error fetching user info:', error);
              }
          });
      }
  }, []);
  

  return (
    <div className='grid-body'>
        <div className="header-menu">
      <div className="menu-header">
        <ul className="menu-list">
          <li></li>
          <li><a href="#" style={{color: '#5751E1'}}>Home</a></li>
          <li><a href="#">Courses</a></li>
          <li><a href="#">Teacher</a></li>
          <li><a href="#">My Courses</a></li>
        </ul>
        
        <div className="function">
            <div className="menu-toggle"><i className="fa-solid fa-bars"></i></div>
            <input type="text" className="search-function" placeholder="Search..." />
            <a className="button-function" href="#"><i className="fa-solid fa-cart-shopping icon-function"></i></a>
            <a className="button-function" href="#"><i className="fa-solid fa-bell icon-function"></i></a>
            {userInfo ? (
                            <div className="user-info d-flex align-items-center">
                            <img src="path/to/avatar.jpg" alt="Avatar" className="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                            <span>{userInfo.username}</span>
                            
                        </div>
                        ) : (
                            <>
                                <a className="button-function" href="#"><button>Log in</button></a>
                                <a className="button-function" href="#"><button>Sign In</button></a>
                            </>
                        )}
        </div>
      </div>
    </div>
    </div>
  );
}

export { HeaderMenu };
