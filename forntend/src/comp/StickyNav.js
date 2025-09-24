import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const NavWrap = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const NavBig = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    font-size: 40px;
    font-weight: 800;
  }
  img {
    width: 44px;
    height: 44px;
    object-fit: contain;
  }
`;
const NavSmall = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    font-weight: 600;
  }
  div {
    width: 2px;
    height: 20px;
    background-color: #e4e4e4;
  }
  .italic {
    font-style: italic;
    font-weight: 200;
    padding-bottom: 5px;
  }
`;
const NavItem = styled.li`
  border-bottom: 5px solid transparent;
  &:hover {
    border-color: #000;
  }
`;

const StickyNav = () => {
  const navigate = useNavigate();
  return (
    <NavWrap>
      <NavBig>
        <ul>
          <li>
            <NavLink to="/collection">Special-Order</NavLink>
          </li>
          <li>
            <NavLink to="/collection">Showcase</NavLink>
          </li>
          <li>
            <NavLink to="/collection">PT</NavLink>
          </li>
          <li>
            <NavLink to="/collection">29Magazine</NavLink>
          </li>
        </ul>
        <button>
          <img
            src={process.env.PUBLIC_URL + "/img/main_svg/search.svg"}
            alt=""
          />
        </button>
      </NavBig>
      <NavSmall>
        <ul>
          <NavItem>
            <NavLink to="/collection">BEST</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/collection">WOMEN</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/collection">MEN</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/collection">INTERIOR</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/collection">KITCHEN</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/collection">ELECTRONICS</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/collection">DIGITAL</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/collection">BEAUTY</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/collection">FOOD</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/collection">LEISURE</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/collection">KIDS</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/collection">CULTURE</NavLink>
          </NavItem>
          <div></div>
          <li className="italic">
            <NavLink to="/collection">Event</NavLink>
          </li>
          <li className="italic">
            <NavLink to="/collection">Lookbook</NavLink>
          </li>
          <li className="italic">
            <p onClick={() => navigate("/board")}>게시판</p>
            {/* <a href="#">Board</a> */}
          </li>
          <li className="italic">
            <p onClick={() => navigate("/review")}>리뷰</p>
            {/* <a href="#">Board</a> */}
          </li>
        </ul>
      </NavSmall>
    </NavWrap>
  );
};

export default StickyNav;
