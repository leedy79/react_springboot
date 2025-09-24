import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api/axiosConfig";

const NewBoardForm = () => {
  const [board, setBoard] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  // 페이지 진입 시 로그인 여부 체크 (직접 URL 접근 차단)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login"); //  메인으로 리다이렉트
    }
  }, [navigate]); //  navigate 의존성

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoard((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 로그인 여부 확인 (이중 안전장치: 진입 체크 + 제출 시 재검사)
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 제목 공백 체크
    if (!board.title.trim()) {
      alert("제목을 입력하세요.");
      return;
    }

    // 내용 공백 체크
    if (!board.content.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    // 모든 유효성 통과 후 서버로 전송, POST 요청 (토큰 포함)
    // http://localhost:8080/api/board
    api
      .post("/api/board", board)
      .then(() => {
        alert("등록 완료!");
        navigate("/board"); // 메인 페이지로 이동
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          alert("권한이 없습니다.");
        } else {
          alert("등록 실패");
        }
        console.error(error);
      });
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">새 게시글 등록</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formTitle">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="title"
              value={board.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formContent">
          <Form.Label column sm={2}>
            Content
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={5}
              name="content"
              value={board.content}
              onChange={handleChange}
              placeholder="내용을 입력하세요"
              required
            />
          </Col>
        </Form.Group>

        <div className="text-end">
          <Button variant="primary" type="submit">
            저장
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default NewBoardForm;
