import React from "react";
import styled from "styled-components";
import Header from "../comp/Sticky";
import MainLeft from "../comp/main/MainLeft";
import MainRight from "../comp/main/MainRight";
import MainMore from "../comp/main/MainMore";
import Footer from "../comp/Footer";

const Wrap = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const Main = () => {
  return (
    <div>
      <Header />
      <Wrap>
        <MainLeft />
        <MainRight />
        <MainMore />
      </Wrap>
      <Footer />
    </div>
  );
};

export default Main;
