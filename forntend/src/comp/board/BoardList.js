import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "../../comp/Sticky";
import Footer from "../../comp/Footer";
import api from "../../api/axiosConfig";

function Board() {
  // 회원 목록 상태
  const [contents, setBoard] = useState([]);

  // 현재 페이지 번호와 전체 페이지 수를 담는 상태
  const [pageInfo, setPageInfo] = useState({ number: 0, totalPages: 0 });

  // 현재 페이지 번호만 따로 관리 (페이지 버튼 클릭 시 변경)
  const [currentPage, setCurrentPage] = useState(0);

  // 로그인 상태를 state로 관리 (로그아웃 시 즉시 반영)
  const [loginUser, setLoginUser] = useState(localStorage.getItem("username"));
  const [hasToken, setHasToken] = useState(!!localStorage.getItem("token")); // 토큰 있으면 true, 없으면 false

  // currentPage 값이 변경될 때마다 회원 목록을 가져옴
  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage]);

  // 로그인/로그아웃(다른 탭 포함) 변화 감지 → 상태 갱신
  useEffect(() => {
    const onStorage = () => {
      setLoginUser(localStorage.getItem("username"));
      setHasToken(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // 특정 페이지 번호에 해당하는 회원 목록 요청
  // http://localhost:8080/api/board?page=${page}&size=3
  const fetchPage = (page) => {
    api
      .get(`/api/board?page=${page}&size=3`)
      .then((res) => {
        setBoard(res.data.content);
        setPageInfo({
          number: res.data.number,
          totalPages: res.data.totalPages,
        });
      })
      .catch((err) => {
        console.error("목록 조회 실패:", err);
        // (선택) 공개 목록이 아니라면 여기서 401/403 처리 가능
      });
  };

  // 페이지 버튼 클릭 시 해당 페이지로 이동
  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // 삭제
  const handleDelete = (id) => {
    if (!hasToken) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    // 실제 전송 시에는 토큰 문자열이 필요하므로 localStorage에서 직접 가져옴
    const token = localStorage.getItem("token");
    api
      .delete(`/api/board/${id}`)
      .then(() => {
        alert("삭제 완료!");
        fetchPage(currentPage);
      })
      .catch((err) => {
        console.error("삭제 에러:", err);
        if (err.response?.status === 403) {
          alert("작성자만 삭제할 수 있습니다.");
        } else if (err.response?.status === 401) {
          alert("로그인이 필요합니다.");
        } else {
          alert("삭제 중 오류가 발생했습니다.");
        }
      });
  };

  return (
    <div className="container-fluid mt-4">
      <Header />
      <div className="d-flex justify-content-between mb-3">
        <h2>게시글 목록</h2>
        {/* 로그인한 사용자만 '새 회원 등록' 버튼 표시 */}
        {hasToken ? (
          <Link to="/new">
            <Button variant="primary">+ 새 게시글 등록</Button>
          </Link>
        ) : (
          <span className="text-muted">로그인하면 회원 등록이 가능합니다.</span>
        )}
      </div>

      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Created At</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((content) => (
            <tr key={content.id}>
              <td>{content.id}</td>
              <td>{content.title}</td>
              <td>{content.content}</td>
              <td>{content.createdAt}</td>
              <td>{content.createdBy}</td>
              <td>
                {/* 글 읽기 버튼: 항상 보임 */}
                <Link to={`/view/${content.id}`}>
                  <Button size="sm" variant="info" className="me-2">
                    보기
                  </Button>
                </Link>
                {/* 작성자 + 로그인 상태일 때만 수정/삭제 버튼 표시 */}
                {hasToken && content.createdBy === loginUser && (
                  <>
                    <Link to={`/edit/${content.id}`}>
                      <Button size="sm" variant="warning" className="me-2">
                        수정
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(content.id)}
                    >
                      삭제
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 페이지 번호 */}
      <div className="d-flex justify-content-center mt-3">
        {Array.from({ length: pageInfo.totalPages }, (_, i) => (
          <Button
            key={i}
            variant={i === pageInfo.number ? "dark" : "outline-dark"}
            className="mx-1"
            onClick={() => handlePageClick(i)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Board;
