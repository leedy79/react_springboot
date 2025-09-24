import React from "react";
import styled from "styled-components";
import FooterSect1 from "../comp/FooterSect_1";
import FooterSect2 from "../comp/FooterSect_2";
import FooterSect3 from "../comp/FooterSect_3";

const FooterWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 48px 48px;
`;
const Hr = styled.hr`
  border-top: 1px;
  border-color: #e4e4e4;
`;

const Footer = () => {
  return (
    <FooterWrap>
      <FooterSect1></FooterSect1>
      <Hr />
      <FooterSect2></FooterSect2>
      <Hr />
      <FooterSect3></FooterSect3>
    </FooterWrap>
  );
};

export default Footer;
