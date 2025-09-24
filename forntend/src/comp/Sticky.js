import React from "react";
import styled from "styled-components";
import StickyHeader from "./StickyHeader";
import StickyNav from "./StickyNav";

const Header = styled.div`
  height: 217px;
  padding: 40px 48px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Sticky = () => {
  return (
    <Header>
      <StickyHeader />
      <StickyNav />
    </Header>
  );
};

export default Sticky;
