import React from "react";
import '../Resource/Css/viet-all.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import { HeaderMenu } from "../Component/Menu";
import Footer from "../Component/Footer";

const ContactUs = () => {
    return (
        <>
            <HeaderMenu />
            <section className="container2">
                <div className="inner-container7">
                    <div className="address-container">
                        <div className="address-item">
                            <div className="list-item15">
                                <div className="divicon-wrapper">
                                    <img
                                        className="divicon"
                                        loading="lazy"
                                        alt=""
                                        src="./viet-img/divicon.svg"
                                    />
                                </div>
                                <div className="heading-4-address-parent">
                                    <div className="heading-46">Address</div>
                                    <div className="awamileaug-drive-kensington-container">
                                        <span>
                                            <p className="awamileaug-drive-kensington">
                                                8A, Ton That Thuyet, My Dinh
                                            </p>
                                            <p className="awamileaug-drive-kensington">
                                                Ha Noi, Viet Nam
                                            </p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="list-item15">
                                <div className="divicon-container">
                                    <img
                                        className="divicon"
                                        loading="lazy"
                                        alt=""
                                        src="./viet-img/divicon1.svg"
                                    />
                                </div>
                                <div className="heading-4-address-parent">
                                    <div className="heading-47">Phone</div>
                                    <div className="link-1-container">
                                        <p className="awamileaug-drive-kensington">0987654321</p>
                                        <p className="awamileaug-drive-kensington">0987654321</p>
                                    </div>
                                </div>
                            </div>
                            <div className="list-item15">
                                <div className="divicon-container">
                                    <img
                                        className="divicon"
                                        loading="lazy"
                                        alt=""
                                        src="./viet-img/divicon2.svg"
                                    />
                                </div>
                                <div className="heading-4-address-parent">
                                    <div className="heading-48">E-mail Address</div>
                                    <div className="awamileaug-drive-kensington-container">
                                        <span className="link-infogmailcom-container1">
                                            <p className="awamileaug-drive-kensington">
                                                info@gmail.com
                                            </p>
                                            <p className="awamileaug-drive-kensington">
                                                info@gmail.com
                                            </p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="divcontact-form-wrap">
                            <div className="inner-container8">
                                <h2 className="heading-49">Send Us Message</h2>
                                <div className="your-email-address">
                                    Your email address will not be published. Required fields are
                                    marked *
                                </div>
                            </div>
                            <div className="inner-container9">
                                <div className="form-textarea"></div>
                            </div>
                            <form className="inner-container10">
                                <div className="input-fields-container">
                                    <div className="form-input">
                                        <input
                                            className="divplaceholder"
                                            placeholder="Name *"
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <input
                                            className="divplaceholder"
                                            placeholder="E-mail *"
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <input
                                            className="divplaceholder"
                                            placeholder="Website *"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <button className="form-button" type="submit">
                                    <div className="submit-now">Submit Now</div>
                                    <div className="inner-container11">
                                        <img className="svg-icon" alt="" src="./viet-img/svg.svg" />
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>
                    <iframe
                        className="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2633.327020847215!2d105.78189038933915!3d21.029213163566762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab00954decbf%3A0xdb4ee23b49ad50c8!2zRlBUIEFwdGVjaCBIw6AgTuG7mWkgLSBI4buHIHRo4buRbmcgxJHDoG8gdOG6oW8gbOG6rXAgdHLDrG5oIHZpw6puIHF14buRYyB04bq_!5e0!3m2!1svi!2s!4v1722868351065!5m2!1svi!2s"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ContactUs;
