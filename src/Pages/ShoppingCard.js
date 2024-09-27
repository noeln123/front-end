import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderMenu } from '../Component/Menu';
import Footer from '../Component/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ShoppingCard = () => {
    const [cartItems, setCartItems] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch cart items
    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('token');
            try {
                if (token) {
                    const response = await fetch('http://localhost:8080/api/cart', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    if (data.code === 1000) {
                        setCartItems(data.result);
                    }
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchCartItems();
    }, []);

    // Fetch course details for each productId
    useEffect(() => {
        const fetchCourseDetails = async (productId) => {
            try {
                const response = await fetch(`http://localhost:8080/api/course/${productId}`);
                const data = await response.json();
                if (data.code === 1000) {
                    return data.result;
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
            return null;
        };

        const loadCourses = async () => {
            const coursePromises = cartItems.map((item) => fetchCourseDetails(item.productId));
            const courseResults = await Promise.all(coursePromises);
            setCourses(courseResults.filter((course) => course !== null));
            setIsLoading(false);
        };

        if (cartItems.length > 0) {
            loadCourses();
        } else {
            setIsLoading(false);
        }
    }, [cartItems]);

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const handleRemoveItem = async (cartId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/api/cart/${cartId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.code === 1000) {
                // Hiển thị thông báo thành công
                toast.success('Product removed successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                });

                // Cập nhật lại danh sách giỏ hàng bằng cách loại bỏ sản phẩm đã xóa
                const updatedCartItems = cartItems.filter(item => item.id !== cartId);
                setCartItems(updatedCartItems);

                // Cập nhật danh sách courses tương ứng
                const updatedCourses = courses.filter((_, index) => cartItems[index].id !== cartId);
                setCourses(updatedCourses);

            } else {
                toast.error('Failed to remove product', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error removing item:', error);
            toast.error('Failed to remove product', {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <>
            <HeaderMenu />
            <div className='body_shoppingcart'>
                <section className="h-100 h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card card-registration card-registration-2" style={{ borderRadius: '15px', paddingTop: '0' }}>
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <h1 className="fw-bold mb-0">Cart</h1>
                                                    <h6 className="mb-0 text-muted">{courses.length} items</h6>
                                                </div>
                                                <hr className="my-4" />

                                                {isLoading ? (
                                                    <div>Loading...</div>
                                                ) : (
                                                    courses.length === 0 ? (
                                                        <div className="text-center">
                                                            <h5>Oops! Looks like you haven't added anything yet <i class="fa-regular fa-face-sad-tear"></i>
                                                            </h5>
                                                        </div>
                                                    ) : (
                                                        courses.map((course, index) => (
                                                            <div className="row mb-4 d-flex justify-content-between align-items-center" key={index}>
                                                                <div className="col-md-2 col-lg-2 col-xl-2">
                                                                    <img
                                                                        src={`http://localhost:8080/uploads/course/${course.img}`}
                                                                        className="img-fluid rounded-3"
                                                                        alt={course.title}
                                                                    />
                                                                </div>
                                                                <div className="col-md-3 col-lg-3 col-xl-3">
                                                                    <h6 className="text-muted">{course.title}</h6>
                                                                    <h6 className="mb-0">{course.description}</h6>
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
                                                                    <input
                                                                        id="form1"
                                                                        min="0"
                                                                        name="quantity"
                                                                        value={cartItems[index].quantity}
                                                                        type="number"
                                                                        className="form-control form-control-sm"
                                                                        readOnly
                                                                    />
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
                                                                    <h6 className="mb-0">$ {course.price}</h6>
                                                                </div>
                                                                <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                    <button className="btn btn-link text-muted" onClick={() => handleRemoveItem(cartItems[index].id)}>
                                                                        <i className="fas fa-times"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )
                                                )}

                                                <hr className="my-4" />

                                                <div className="pt-5">
                                                    <h6 className="mb-0">
                                                        <a href="#!" className="text-body">
                                                            <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                            <Link className='backShop' to='/courses'><span className='backToShop'>Back</span></Link>
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
                                                    <h5 className="text-uppercase">{courses.length} items</h5>
                                                    <h5>
                                                        $ {courses.reduce((total, course, index) => total + course.price * cartItems[index].quantity, 0).toFixed(2)}
                                                    </h5>
                                                </div>

                                                <h5 className="text-uppercase mb-3">Coupon Code</h5>
                                                <div className="mb-5">
                                                    <div className="form-outline">
                                                        <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="form3Examplea2">Enter your code</label>
                                                    </div>
                                                </div>

                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-5">
                                                    <h5 className="text-uppercase">Total price</h5>
                                                    <h5>
                                                        $ {courses.reduce((total, course, index) => total + course.price * cartItems[index].quantity, 0).toFixed(2)}
                                                    </h5>
                                                </div>

                                                <button type="button" className="btn btn-dark btn-block btn-lg">Checkout</button>
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
            <ToastContainer /> {/* Để thông báo hiển thị */}
        </>
    );
};

export default ShoppingCard;
