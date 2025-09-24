import React from "react";
import styled from "styled-components";

const SectWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 56px;
  .leftBox {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    max-width: 1000px;
  }
  .listBox {
    font-size: 12px;
    display: flex;
    gap: 10px;
  }
  .leftBoxInner {
    display: flex;
    flex-direction: column;
    color: #5d5d5d;
    font-size: 10px;
    gap: 14px;
  }
  .addrBox {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }
  .addrBox a {
    background-color: #a0a0a0;
    color: white;
    padding: 5px 7px;
    margin-left: 3px;
  }
  .escrowBox {
    display: flex;
    padding: 0 48px;
    align-items: center;
    gap: 9px;
    font-size: 11px;
    min-width: fit-content;
    img {
      width: 42px;
      height: 42px;
    }
  }
  span {
    color: #c4c4c4;
  }
`;

const FooterSect3 = () => {
  return (
    <SectWrap>
      <div className="leftBox">
        <ul className="listBox">
          <li>
            <a href="#">개인정보 처리방침</a>
          </li>
          <span>|</span>
          <li>
            <a href="#">이용약관</a>
          </li>
          <span>|</span>
          <li>
            <a href="#">분쟁해결기준</a>
          </li>
          <span>|</span>
          <li>
            <a href="#">안전거래센터</a>
          </li>
          <span>|</span>
          <li>
            <a href="#">결제대행 위탁사</a>
          </li>
        </ul>
        <div className="leftBoxInner">
          <div className="addrBox">
            <div>상호명: (주)무신사</div>
            <div>
              사업장소재지: 서울특별시 성동구 아차산로 13길 11, 1층 (성수동2가,
              무신사캠퍼스 N1)
            </div>
            <div>팩스: 070-8622-7737</div>
            <div>사업자등록번호: 211-88-79575</div>
            <div>
              통신판매업신고: 2022-서울성동-01952<a href="#">사업자정보확인</a>
            </div>
            <div>전화번호: 1660-2929</div>
            <div>이메일: customer@29cm.co.kr</div>
            <div>대표: 조만호, 박준모</div>
            <div>호스팅서비스: (주)무신사</div>
          </div>
          <div>
            일부 상품의 경우 29CM는 통신판매의 당사자가 아닌 통신판매중개자로서
            상품, 상품정보, 거래에 대한 책임이 제한될 수 있으므로, 각 상품
            페이지에서 구체적인 내용을 확인하시기 바랍니다.
          </div>
        </div>
      </div>
      <a className="escrowBox" href="#">
        <img src={process.env.PUBLIC_URL + "/img/escrow.jpg"} alt="escrow" />
        <span>
          KG 에스크로
          <br />
          가입 사실 확인
        </span>
      </a>
    </SectWrap>
  );
};

export default FooterSect3;
