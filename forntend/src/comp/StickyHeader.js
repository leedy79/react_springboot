import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.div`
  width: 60px;
  height: auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const Nav = styled.ul`
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
  li a {
    display: flex;
    font-size: 10px;
    align-items: center;
    gap: 4px;
    text-decoration: none;
  }
  img {
    width: 18px;
    height: 18px;
  }
`;

const StickyHeader = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let username = null;

  // 배포/로컬에 따라 경로 선택
  const baseUrl =
    process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.sub; // 토큰에서 username 추출
    } catch (e) {
      console.error("토큰 해독 실패:", e);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <Header>
      <Logo>
        <NavLink to="/">
          <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="logo" />
        </NavLink>
      </Logo>
      <Nav>
        <li>
          <NavLink to="/">
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/mypage.svg"}
              alt=""
            />
            <span>MY PAGE</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/mylike.svg"}
              alt=""
            />
            <span>MY LIKE</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart">
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/shoppingbag.svg"}
              alt=""
            />
            <span>SHOPPING BAG</span>
          </NavLink>
        </li>

        {/* 로그인 여부에 따른 분기 */}
        {token ? (
          <>
            <li>
              <NavLink to="#" onClick={(e) => e.preventDefault()}>
                <span>[{username}님]</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={handleLogout}>
                <img
                  src={process.env.PUBLIC_URL + "/img/main_svg/login.svg"}
                  alt=""
                />
                <span>LOGOUT</span>
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">
                <img
                  src={process.env.PUBLIC_URL + "/img/main_svg/login.svg"}
                  alt=""
                />
                <span>LOGIN</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup">
                <img
                  src={process.env.PUBLIC_URL + "/img/main_svg/login.svg"}
                  alt=""
                />
                <span>SIGN UP</span>
              </NavLink>
            </li>
          </>
        )}
      </Nav>
    </Header>
  );
};

export default StickyHeader;
