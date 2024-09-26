import React, { useEffect, useState } from "react";
import Footer from "../Component/Footer";
import { HeaderMenu } from "../Component/Menu";
import "../Resource/Css/tuan-all.css"; // Ensure styles are applied correctly
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const CourseDetail = () => {
  const { id } = useParams(); // Lấy ID khóa học từ URL
  const [course, setCourse] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false); // Track purchase state
  const [rating, setRating] = useState(0); // Rating from 1 to 5
  const [reviewText, setReviewText] = useState(''); // Review content
  const [reviews, setReviews] = useState([]); // List of reviews
  const [token, setToken] = useState(localStorage.getItem('token')); // Check if user is logged in
  const [showAlert, setShowAlert] = useState(false); // State for alert visibility

  const handlePurchase = () => {
    // Simulate purchase
    setIsPurchased(true);
  };

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        // Lấy chi tiết khóa học
        const response = await axios.get(`http://localhost:8080/api/course/${id}`);
        setCourse(response.data.result);

        // Lấy danh sách feedbacks
        const reviewsResponse = await axios.get(`http://localhost:8080/api/courses/${id}/feedbacks`);
        setReviews(reviewsResponse.data.result);
      } catch (error) {
        console.error('Error fetching course details or reviews:', error);
      }
    };

    fetchCourseDetail();
  }, [id, token]);

  const handleAddToCart = async () => {
    const cartItem = {
      productId: id,
      quantity: 1,
    };

    try {
      await axios.post('http://localhost:8080/api/cart', cartItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Hiển thị thông báo thành công
      setShowAlert(true);
      // Ẩn thông báo sau 5 giây
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewSubmit = async () => {
    const newReview = {
      rating,
      comment: reviewText,
    };

    try {
      await axios.post(`http://localhost:8080/api/courses/${id}/feedbacks`, newReview, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Lấy lại danh sách reviews sau khi thêm mới
      const reviewsResponse = await axios.get(`http://localhost:8080/api/courses/${id}/feedbacks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(reviewsResponse.data.result);
      setRating(0);
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!course) {
    return <p>Loading...</p>; // Hiển thị khi chưa có dữ liệu
  }

  return (
    <>
      <HeaderMenu />

      <div className="mt-5 grid-body">
        <div className="row">
          {/* Hiển thị thông báo */}
          {showAlert && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              Add product to cart successfully!
              <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
            </div>
          )}

          {/* Left content */}
          <div className="col-md-8">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h1 className="card-title">{course.title}</h1>
                <p className="card-text">{course.description}</p>
                <h5 className="card-subtitle mb-2 text-muted">Lessons included:</h5>
                <ul className="list-group list-group-flush">
                  {[
                    "You will master the Python programming language by building 100 unique projects.",
                    "Program in Python professionally.",
                    "Create a portfolio of 100 Python projects.",
                    "Learn Selenium, Flask, Pandas, NumPy, and more.",
                    "Build websites and web apps with Python.",
                    "Build games like Blackjack, Pong, and Snake."
                  ].map((item, index) => (
                    <li key={index} className="list-group-item">
                      <i className="bi bi-check-circle-fill text-success"></i> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="card mb-4">
              <div className="card-header">
                <h2>Reviews</h2>
              </div>
              <div className="card-body">
                <h5>Average Rating: {course.rate} / 5</h5>
                <ul className="list-group">
                  {reviews.map((review, index) => (
                    <li key={index} className="list-group-item">
                      <strong>{review.student.fullName}:</strong> {review.rating} / 5
                      <p>{review.comment}</p>
                      <small className="text-muted">Posted on: {review.createdAt}</small>
                    </li>
                  ))}
                </ul>

                {/* Chỉ hiển thị form nếu người dùng đã đăng nhập */}
                {token && (
                  <div className="mt-4">
                    <h5>Leave a review</h5>
                    <div className="mb-3">
                      <label htmlFor="rating" className="form-label">Rating</label>
                      <select
                        className="form-select"
                        value={rating}
                        onChange={(e) => handleRatingChange(e.target.value)}
                      >
                        <option value="0">Choose...</option>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <option key={star} value={star}>{star} star(s)</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="review" className="form-label">Your review</label>
                      <textarea
                        className="form-control"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows="3"
                      />
                    </div>
                    <button className="btn btn-primary" onClick={handleReviewSubmit}>
                      Submit Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <iframe
                width="100%"
                height="250"
                src="https://www.youtube.com/embed/GmWxyjJhYnY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="card-body text-center">
                <h2 className="card-title">${course.price}</h2>
                {!isPurchased ? (
                  <>
                    <button className="btn btn-warning mb-2 w-100" onClick={handleAddToCart}>
                      Add to cart
                    </button>
                    <button className="btn btn-success mb-2 w-100" onClick={handlePurchase}>
                      Buy Now
                    </button>
                  </>
                ) : (
                  <Link className="btn btn-primary w-100" to="/courseVideo">
                    Start Now
                  </Link>
                )}
                <p className="mt-3">
                  30-day money-back guarantee
                </p>
                <h5>This course includes:</h5>
                <ul className="list-unstyled">
                  <li>4 articles</li>
                  <li>Access on mobile and TV</li>
                  <li>Lifetime access</li>
                  <li>Certificate of completion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetail;
