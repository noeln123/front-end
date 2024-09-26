import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderMenu } from '../Component/Menu';
import Footer from '../Component/Footer';

const ShoppingCard = () => {
    return (
        <>
            <HeaderMenu />
            <div style={{maxWidth: '1200px', width: '100%', margin:'30px auto'}} className='body_shoppingcart'>
                <section className="h-100 h-custom" >
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <h1 className="fw-bold mb-0">Cart</h1>
                                                    <h6 className="mb-0 text-muted">3 items</h6>
                                                </div>
                                                <hr className="my-4" />

                                                {[...Array(3)].map((_, index) => (
                                                    <div className="row mb-4 d-flex justify-content-between align-items-center" key={index}>
                                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img${index + 5
                                                                    }.webp`}
                                                                className="img-fluid rounded-3"
                                                                alt="Cotton T-shirt"
                                                            />
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 className="text-muted">Shirt</h6>
                                                            <h6 className="mb-0">Cotton T-shirt</h6>
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                            <button
                                                                className="btn btn-link px-2"
                                                                onClick={() => {
                                                                    const input = document.querySelectorAll('input[type=number]')[index];
                                                                    input.stepDown();
                                                                }}
                                                            >
                                                                <i className="fas fa-minus"></i>
                                                            </button>
                                                            <input id="form1" min="0" name="quantity" value="1" type="number" className="form-control form-control-sm" />
                                                            <button
                                                                className="btn btn-link px-2"
                                                                onClick={() => {
                                                                    const input = document.querySelectorAll('input[type=number]')[index];
                                                                    input.stepUp();
                                                                }}
                                                            >
                                                                <i className="fas fa-plus"></i>
                                                            </button>
                                                        </div>
                                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                            <h6 className="mb-0">€ 44.00</h6>
                                                        </div>
                                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                            <a href="#!" className="text-muted">
                                                                <i className="fas fa-times"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                ))}



                                                

                                                <hr className="my-4" />

                                                <div className="pt-5">
                                                    <h6 className="mb-0">
                                                        <a href="#!" className="text-body">
                                                            <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                            <span className='backToShop'>Back to shop</span>
                                                        </a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 bg-body-tertiary">
                                            <div className="p-5">
                                                <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                                <hr className="my-4" />
                                                <div className="d-flex justify-content-between mb-4">
                                                    <h5 className="text-uppercase">3 items</h5>
                                                    <h5>€ 132.00</h5>
                                                </div>

                                                <h5 className="text-uppercase mb-3">Shipping</h5>
                                                <div className="mb-4 pb-2">
                                                    <select className="form-select">
                                                        <option value="1">Standard-Delivery- €5.00</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                        <option value="4">Four</option>
                                                    </select>
                                                </div>

                                                <h5 className="text-uppercase mb-3">coupond code</h5>
                                                <div className="mb-5">
                                                    <div className="form-outline">
                                                        <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="form3Examplea2">
                                                            Enter your code
                                                        </label>
                                                    </div>
                                                </div>

                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-5">
                                                    <h5 className="text-uppercase">Total price</h5>
                                                    <h5>€ 132.00</h5>
                                                </div>

                                                <button type="button" className="btn btn-dark btn-block btn-lg">
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </>

    );

};

export default ShoppingCard;