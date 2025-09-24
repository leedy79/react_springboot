import React from "react";
import styled from "styled-components";
import Header from "../comp/Sticky";
import Product from "../comp/product/ProductDetail";
import Footer from "../comp/Footer";

const Wrap = styled.div`
  display: flex;
  /* position: relative;
  overflow: hidden; */
  /* max-height: 12000px; */
`;

const Main = () => {
  return (
    <div>
      <Header />
      <Product></Product>
      <Footer />
    </div>
  );
};

export default Main;
