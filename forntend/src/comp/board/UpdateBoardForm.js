import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // URL 파라미터 및 페이지 이동
import { Form, Button, Container, Row, Col } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api/axiosConfig"; // 커스텀 api import

// 회원 수정 컴포넌트
const UpdateBoardForm = () => {
  // URL의 id 파라미터 추출
  const { id } = useParams();

  // 페이지 이동 함수
  const navigate = useNavigate();

  // 회원 정보 상태 관리
  const [board, setBoard] = useState({
    id: "",
    title: "",
    content: "",
    createdBy: "", // 1 작성자 비교
  });

  // 2 진입 시 토큰 확인 + 데이터 조회 시 토큰 헤더 포함 + 작성자 본인 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    //http://localhost:8080/api/board/${id}
    api
      .get(`/api/board/${id}`) // axios → api 로 교체, 헤더 제거
      .then((res) => {
        setBoard(res.data);

        // 작성자 본인만 접근 허용
        if (res.data?.createdBy && res.data.createdBy !== username) {
          alert("작성자만 수정할 수 있습니다.");
          navigate("/board");
        }
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          alert("작성자만 수정할 수 있습니다.");
          navigate("/board");
        } else {
          alert("회원 조회 실패");
        }
        console.error(err);
      });
  }, [id, navigate]);

  // 페이지 로딩 시 회원 정보 불러오기
  // useEffect(() => {
  //   api
  //     .get(`/api/board/${id}`)
  //     .then((res) => setBoard(res.data))
  //     .catch((err) => {
  //       console.error("글 조회 실패:", err);
  //       if (err.response && err.response.status === 401) {
  //         alert("인증이 만료되었습니다. 다시 로그인해주세요.");
  //         localStorage.removeItem("token");
  //         navigate("/login");
  //       } else {
  //         alert("회원 조회에 실패했습니다.");
  //       }
  //     });
  // }, [id, navigate]);

  // 입력값 변경 핸들링
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoard((prev) => ({ ...prev, [name]: value })); // 기존 값 유지하며 변경된 필드 업데이트
  };

  // 폼 제출 시 실행
  const handleSubmit = (e) => {
    e.preventDefault();

    // 3 제출 시에도 토큰 재확인(이중 안전장치)
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

    // 4 모든 유효성 통과 시 PUT 요청(수정)
    // http://localhost:8080/api/board/${id}
    api
      .put(`/api/board/${id}`, board)
      .then(() => {
        alert("수정 완료!");
        navigate("/board"); // 메인 페이지로 이동
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          // 권한 에러 처리
          alert("작성자만 수정할 수 있습니다.");
        } else if (err.response?.status === 401) {
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert("수정 실패");
        }
        console.error(err);
      });
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4"> 게시글 수정</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Control type="hidden" name="id" value={board.id} />

        <Form.Group as={Row} className="mb-3" controlId="formName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="title"
              value={board.title}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formAge">
          <Form.Label column sm={2}>
            Age
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
          <Button variant="success" type="submit">
            저장
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UpdateBoardForm;
