import { HeaderMenu } from "../Component/Menu"
import Footer from "../Component/Footer"
import "../Resource/Css/tuan-all.css";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import "../Resource/Css/tuan-all.css";


const Home = () => {
    const [wishList, setWishList] = useState([]);

    const toggleWishList = (course) => {
        setWishList((prevList) =>
            prevList.includes(course)
                ? prevList.filter((item) => item !== course)
                : [...prevList, course]
        );
    };

    const courses = [
        { id: 1, title: 'PHP Core', image: '/examples/images/products/ipad.jpg' },
        { id: 2, title: 'PHP Laravel', image: '/examples/images/products/ipad.jpg' },
        { id: 3, title: 'Python', image: '/examples/images/products/ipad.jpg' },
        { id: 4, title: 'C Sharp', image: '/examples/images/products/ipad.jpg' }
    ];



    const [startIndex, setStartIndex] = useState(0);
    const coursesToShow = 4; // Number of courses to display at a time

    const handleNext = () => {
        if (startIndex + coursesToShow < courses.length) {
            setStartIndex(startIndex + coursesToShow);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - coursesToShow);
        }
    }
    return (
        <>
            <HeaderMenu />
            <div>

                <div className="grid-body">
                    <div className="header_body">
                        <img src="/tuan-img/header_body.png" alt="Header Body" className="img-header_body" />
                        <div className="text-img_header">
                            <h2>Skills for everyone, learn everything.</h2>
                            <p>There is a big discount offer happening. Sign up for courses priced from $10 for your career and life. The discount offer will end in the next 30 days.</p>
                        </div>
                        <div className="btn-mobile_home">
                            <p>Start studying to improve your IT skills</p>
                            <Link className="start-now" style={{ textDecoration: 'none' }}>Start Now</Link>
                        </div>
                    </div>
                </div>

                <div className="contact1-body">
                    <p>Trusted by over 15,000 companies and millions of learners worldwide.</p>
                    <div className="img-contact1">
                        <img src="/tuan-img/contact1_header/cisco_logo.svg" alt="Cisco" />
                        <img src="/tuan-img/contact1_header/citi_logo.svg" alt="Citi" />
                        <img src="/tuan-img/contact1_header/ericsson_logo.svg" alt="Ericsson" />
                        <img src="/tuan-img/contact1_header/hewlett_packard_enterprise_logo.svg" alt="Hewlett Packard Enterprise" />
                        <img src="/tuan-img/contact1_header/procter_gamble_logo.svg" alt="Procter & Gamble" />
                        <img src="/tuan-img/contact1_header/samsung_logo.svg" alt="Samsung" />
                        <img src="/tuan-img/contact1_header/volkswagen_logo.svg" alt="Volkswagen" />
                    </div>
                </div>
                <div className="container">
                    <h2>Featured <b>Courses</b></h2>
                    <Carousel indicators={true} controls={true} interval={null}>
                        {courses.map((course, index) => (
                            <Carousel.Item key={index}>
                                <div className="row">
                                    {courses.map((item, idx) => (
                                        <div className="col-sm-3" key={idx}>
                                            <div className="thumb-wrapper">
                                                <span
                                                    className="wish-icon"
                                                    onClick={() => toggleWishList(item.title)}
                                                >
                                                    <i className={`fa ${wishList.includes(item.title) ? 'fa-heart' : 'fa-heart-o'}`}></i>
                                                </span>
                                                <div className="img-box">
                                                    <img src={item.image} className="img-responsive" alt="" />
                                                </div>
                                                <div className="thumb-content">
                                                    <h4>{item.title}</h4>
                                                    <div className="star-rating">
                                                        <ul className="list-inline">
                                                            {[...Array(5)].map((_, i) => (
                                                                <li className="list-inline-item" key={i}>
                                                                    <i className={`fa ${i < 4 ? 'fa-star' : 'fa-star-o'}`}></i>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <p className="item-price">
                                                        <strike>$40.00</strike> <b>$36.00</b>
                                                    </p>
                                                    <Button variant="primary">Add to Cart</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <a className="carousel-control-prev" href="#carouselExample" role="button" data-slide="prev">
                        <i className="fa fa-angle-left"></i>
                    </a>
                    <a className="carousel-control-next" href="#carouselExample" role="button" data-slide="next">
                        <i className="fa fa-angle-right"></i>
                    </a>
                </div>
            </div>

            <Footer />
        </>
    )
}
export default Home;