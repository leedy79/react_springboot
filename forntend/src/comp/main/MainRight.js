import React from "react";
import styled from "styled-components";
import MainRightProduct from "./MainRightProduct";

const MainRightWrap = styled.div`
  background-color: grey;
  display: flex;
  flex-wrap: wrap;
  width: 56%;
  position: relative;
  /* width: 100%;
  max-width: 100%; */
  /* max-height: 12000px; */
`;

const MainRight = () => {
  return (
    <>
      {/* <MainRightWrap> */}
      <MainRightProduct />
      {/* </MainRightWrap> */}
    </>
  );
};

export default MainRight;
