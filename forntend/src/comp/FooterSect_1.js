import React from "react";
import styled from "styled-components";

const SectWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  .support {
    font-size: 15px;
    font-weight: 600;
  }
  .supportBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 4px;
  }
  .supportTime {
    font-size: 12px;
    color: #a0a0a0;
  }
  .buttonWrap {
    display: flex;
    justify-content: space-between;
  }
  .buttonWrapInner {
    display: flex;
    gap: 4px;
  }
  .button {
    display: flex;
    gap: 20px;
    background-color: #000;
    color: white;
    font-size: 15px;
    font-weight: 400;
    padding: 4px 8px 4px 14px;
    align-items: center;
    line-height: 1.5;
  }
  .button img {
    width: 12px;
    height: 12px;
  }
  .snsBox {
    display: flex;
    gap: 8px;
  }
  .snsItem {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .snsItem img {
    width: 18px;
    height: 24px;
  }
`;

const FooterSect1 = () => {
  return (
    <SectWrap>
      <div className="supportBox">
        <div className="support">고객센터 1660-2929</div>
        <div className="supportTime">
          운영시간 : 평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00 제외)
        </div>
      </div>
      <div className="buttonWrap">
        <div className="buttonWrapInner">
          <a className="button" href="#">
            FAQ
            <img src={process.env.PUBLIC_URL + "/img/forward.png"} alt="" />
          </a>
          <a className="button" href="#">
            1:1문의
            <img src={process.env.PUBLIC_URL + "/img/forward.png"} alt="" />
          </a>
        </div>
        <div className="snsBox">
          <a className="snsItem" href="#">
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/instagram_w.svg"}
              alt=""
            />
          </a>
          <a className="snsItem" href="#">
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/youtube_w.svg"}
              alt=""
            />
          </a>
          <a className="snsItem" href="#">
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/apple_w.svg"}
              alt=""
            />
          </a>
          <a className="snsItem" href="#">
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/playstore_w.svg"}
              alt=""
            />
          </a>
        </div>
      </div>
    </SectWrap>
  );
};

export default FooterSect1;
