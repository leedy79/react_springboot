import React from "react";
import styled from "styled-components";
import Header from "../comp/Sticky";
import CollectionProd from "../comp/collection/CollectionProd";
import Footer from "../comp/Footer";

const Wrap = styled.div`
  /* display: flex; */
  position: relative;
  overflow: hidden;
  /* max-height: 12000px; */
`;

const Collection = () => {
  return (
    <div>
      <Header />
      <Wrap>
        <CollectionProd></CollectionProd>
      </Wrap>
      <Footer />
    </div>
  );
};

export default Collection;
