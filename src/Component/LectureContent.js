import React, { useState } from 'react';
import { Button, Form, Card, Row, Col, Badge, Alert } from 'react-bootstrap';
import { FaThumbsUp, FaThumbsDown, FaCommentDots } from 'react-icons/fa';
import "../Resource/Css/LectureContent.css";

function LectureContent() {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [videoError, setVideoError] = useState(false);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div className="lecture-content p-4">
      {/* Phần video */}
      <Card className="mb-4 shadow-sm border-0">
        <div className="video-wrapper mb-4">
            <iframe
                className="video-embed"
                src="https://www.youtube.com/embed/your-video-url"
                allowFullScreen
                title="Bài giảng React"
                onError={handleVideoError}
            />
            </div>
      </Card>
      
      {/* Tiêu đề */}
      <h2 className="mb-4 text-primary">Học React căn bản</h2>
      
      {/* Nút Like/Dislike */}
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <Button variant="outline-success" className="d-flex align-items-center" onClick={handleLike}>
            <FaThumbsUp className="me-2" />
            <span>Like</span>
            {likeCount > 0 && <Badge bg="success" className="ms-2">{likeCount}</Badge>}
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="outline-danger" className="d-flex align-items-center" onClick={handleDislike}>
            <FaThumbsDown className="me-2" />
            <span>Dislike</span>
            {dislikeCount > 0 && <Badge bg="danger" className="ms-2">{dislikeCount}</Badge>}
          </Button>
        </Col>
      </Row>

      {/* Phần bình luận */}
      <Card className="shadow-sm border-0 p-3 mb-4">
        <h4 className="text-secondary mb-3">
          <FaCommentDots className="me-2" />
          Bình luận
        </h4>
        <Form onSubmit={handleCommentSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Viết bình luận của bạn..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-3"
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Gửi
          </Button>
        </Form>

        {/* Hiển thị các bình luận */}
        <div className="comment-list mt-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <Card key={index} className="mb-2 border-light shadow-sm">
                <Card.Body>{comment}</Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-muted">Chưa có bình luận nào</p>
          )}
        </div>
      </Card>
    </div>
  );
}

export default LectureContent;
