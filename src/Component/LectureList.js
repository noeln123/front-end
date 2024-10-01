import React from 'react';
import { ListGroup } from 'react-bootstrap';

function LectureList() {
  const lectures = [
    { title: 'Giới thiệu về React', id: 1 },
    { title: 'JSX là gì?', id: 2 },
    { title: 'Component trong React', id: 3 },
    { title: 'Props và State', id: 4 },
    { title: 'Vòng đời Component', id: 5 },
  ];

  return (
    <div className="lecture-list">
      <h4>Danh sách bài giảng</h4>
      <ListGroup>
        {lectures.map((lecture) => (
          <ListGroup.Item key={lecture.id}>
            {lecture.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default LectureList;
