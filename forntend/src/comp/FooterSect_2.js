import React from "react";
import styled from "styled-components";

const SectWrap = styled.div`
  padding-bottom: 8px;
  .sectBox {
    display: flex;
    gap: 12px;
  }
  section {
    font-size: 13px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    min-width: 180px;
  }
  .listBox {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    max-width: 100%;
  }
`;

const FooterSect2 = () => {
  return (
    <SectWrap>
      <ul className="sectBox">
        <section>
          <h4>NOTICE</h4>
          <ul className="listBox">
            <li>
              <a href="#">[공지] 5월 공휴일로 인한 배송 지연 안내</a>
            </li>
            <li>
              <a href="#">[공지] '29체험단' 출시 안내</a>
            </li>
            <li>
              <a href="#">
                [공지] 개인정보 처리방침 개정 예정 안내 (시행일: 2025년 3월
                31일)
              </a>
            </li>
            <li>
              <a href="#">
                [공지] 29CM 안전 거래 정책 위반 행위에 대한 조사 및 제재 사항
                안내
              </a>
            </li>
            <li>
              <a href="#">
                [공지] 2025 설 연휴 고객센터 휴무 및 배송/반품 일정 안내
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h4>ABOUT US</h4>
          <ul className="listBox">
            <li>
              <a href="#">29CM 소개</a>
            </li>
            <li>
              <a href="#">인재채용</a>
            </li>
            <li>
              <a href="#">상시 할인 혜택</a>
            </li>
          </ul>
        </section>
        <section>
          <h4>MY ORDER</h4>
          <ul className="listBox">
            <li>
              <a href="#">주문배송</a>
            </li>
            <li>
              <a href="#">취소/교환/반품 내역</a>
            </li>
            <li>
              <a href="#">상품리뷰 내역</a>
            </li>
            <li>
              <a href="#">증빙서류발급</a>
            </li>
          </ul>
        </section>
        <section>
          <h4>MY ACCOUNT</h4>
          <ul className="listBox">
            <li>
              <a href="#">회원정보수정</a>
            </li>
            <li>
              <a href="#">회원등급</a>
            </li>
            <li>
              <a href="#">마일리지현황</a>
            </li>
            <li>
              <a href="#">쿠폰</a>
            </li>
          </ul>
        </section>
        <section>
          <h4>HELP</h4>
          <ul className="listBox">
            <li>
              <a href="#">1:1문의</a>
            </li>
            <li>
              <a href="#">마케팅 제휴, 입점, 대량 주문 문의</a>
            </li>
            <li>
              <a href="#">상품 Q&A내역</a>
            </li>
            <li>
              <a href="#">공지사항</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">고객의 소리</a>
            </li>
          </ul>
        </section>
      </ul>
    </SectWrap>
  );
};

export default FooterSect2;
