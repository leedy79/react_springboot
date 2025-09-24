import React from "react";
import styled from "styled-components";
import data from "../../db/collectionProd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CollectionWrap = styled.div`
  /* background-color: grey; */
  display: grid;
  gap: 0 20px;
  min-width: 700px;
  padding: 40px 50px 90px;
  grid-template-columns: repeat(12, 1fr);
  .title-box {
    grid-column: 3 / span 8;
    display: flex;
    flex-direction: column;
  }
  .title {
    width: 480px;
    font-size: 48px;
    font-weight: 700;
    line-height: 58px;
    white-space: pre-wrap;
  }
  .desc {
    width: 580px;
    line-height: 24px;
    margin-top: 12px;
    white-space: pre-line;
  }
  .countdown-box {
    grid-column: 3 / span 8;
    display: flex;
    flex-direction: column;
    margin: 30px 0px 60px;
  }
  .time-bar-border {
    height: 2px;
    border-top: 2px solid #ccc;
    padding-top: 12px;
  }
  .time-bar {
    height: 2px;
    background-color: #ff4800;
    margin-top: -13px;
  }
  .countdown {
    line-height: 22px;
    color: #ff4800;
    font-weight: 400;
  }
  .end-date {
    line-height: 22px;
    color: #ccc;
    font-weight: 400;
    margin-top: -23px;
    text-align: right;
  }
  .product-block {
    grid-column: 3 / span 8;
    padding-bottom: 200px;
  }
  .sortBtn-box {
    display: flex;
    margin-top: -26px;
    padding-bottom: 18px;
  }
  .sortBtn-box button {
    position: relative;
    margin-right: 6px;
    padding: 7px 28px 6px 14px;
    font-size: 13px;
    font-weight: 500;
    color: #5d5d5d;
    border: 1px solid #e4e4e4;
    border-radius: 24px;
  }
  .sortBtn-box img {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 10px;
    right: 11px;
    vertical-align: middle;
  }
  .product-list {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 20px;
    row-gap: 40px;
    margin-bottom: 94px;
    padding-bottom: 24px;
    align-self: baseline;
  }
  .product {
    display: flex;
    flex-direction: column;
  }
  .product-box {
    display: flex;
    flex-direction: column;

    /* justify-content: space-between; */
    gap: 8px;
    align-items: stretch;
  }
  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2px;
    flex: 1 1 0%;
  }
  .product-box > img {
    width: 100%;
    height: 100%;
  }
  .brand {
    font-size: 12px;
    font-weight: 700;
  }
  .name {
    font-size: 12px;
  }
  .price-box {
    display: flex;
    gap: 2px;
  }
  .price {
    font-size: 14px;
    font-weight: 700;
  }
  .discount {
    font-size: 14px;
    font-weight: 700;
    color: #ff4800;
    display: inline-block;
  }
  .like-rating-box {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .like-rating {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .like-box img {
    width: 12px;
    height: 12px;
  }
  .like-rating-text {
    font-size: 10px;
    color: #5d5d5da3;
  }

  .btn-more {
    margin-top: 30px;
  }
  .btn-more button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 58px;
    font-size: 15px;
    font-weight: bold;
    color: #000;
    border: 1px solid #000;
  }
  .btn-more img {
    width: 12px;
    height: 12px;
    margin-left: 8px;
  }
`;

const CollectionProd = () => {
  const [item, setImg] = useState(data);
  const navigate = useNavigate();

  // 할인 시작과 종료 시간
  const now = new Date();
  const saleStart = now;
  const saleEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const totalDuration = saleEnd - saleStart;

  const [remainingTime, setRemainingTime] = useState(saleEnd - new Date());
  const [progressPercent, setProgressPercent] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeLeft = saleEnd - now - 48600000;

      if (timeLeft <= 0) {
        clearInterval(timer);
        setRemainingTime(0);
        setProgressPercent(0);
      } else {
        setRemainingTime(timeLeft);
        setProgressPercent(((saleEnd - now - 48600000) / totalDuration) * 100);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const days = Math.floor(totalSec / (60 * 60 * 24));
    const hours = String(
      Math.floor((totalSec % (60 * 60 * 24)) / 3600)
    ).padStart(2, "0");
    const minutes = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSec % 60).padStart(2, "0");

    return `${days > 0 ? `${days}일 ` : ""}${hours}:${minutes}:${seconds}`;
  };

  return (
    <CollectionWrap>
      <div className="title-box">
        <h1 className="title">쿠폰 혜택으로 만나는 액티브웨어</h1>
        <p className="desc">30% 쿠폰 적용 가능한 상품만 모았어요.</p>
      </div>
      <div className="countdown-box">
        <div className="time-bar-border">
          <div
            className="time-bar"
            style={{
              width: `${progressPercent}%`,
              transition: "width 1s linear",
            }}
          ></div>
        </div>
        <div className="countdown">
          {remainingTime > 0
            ? `${formatTime(remainingTime)} 남음`
            : "세일 종료"}
        </div>
        <div className="end-date">
          {`${(saleEnd.getMonth() + 1).toString().padStart(2, "0")}.${saleEnd
            .getDate()
            .toString()
            .padStart(2, "0")}`}
        </div>
      </div>

      <div className="product-block">
        <div className="sortBtn-box">
          <div>
            <div>
              <button>
                베스트순
                <img
                  src={process.env.PUBLIC_URL + "/img/main_svg/arrow_more.svg"}
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
        {/* 제품 리스트 */}
        <div className="product-list">
          {item.map((product, i) => (
            <li key={product.id}>
              <div
                onClick={() =>
                  navigate(`/product/${product.id}`, { state: product })
                }
              >
                <div className="product-box">
                  <img
                    src={process.env.PUBLIC_URL + "/" + product.image}
                    alt={product.name}
                  />
                  <div className="product-info">
                    <p className="brand">{product.brand}</p>
                    <p className="name">{product.name}</p>
                    <div className="price-box">
                      {product.discount && (
                        <span className="discount">{product.discount}</span>
                      )}
                      <span className="price">{product.price}</span>
                    </div>
                  </div>
                  <div className="like-rating-box">
                    <button className="like-rating">
                      <img
                        className="icon-like"
                        src={
                          process.env.PUBLIC_URL +
                          "/img/main_svg/fill_heart.svg"
                        }
                        alt="like"
                      />
                      <span className="like-rating-text">{product.likes}</span>
                    </button>
                    <button className="like-rating">
                      <img
                        className="icon-rating"
                        src={
                          process.env.PUBLIC_URL + "/img/main_svg/fill_star.svg"
                        }
                        alt="rating"
                      />
                      <span className="like-rating-text">
                        {product.rating.score}
                        {"("}
                        {product.rating.count}
                        {")"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
        <div className="btn-more">
          <button>
            상품 더보기
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/arrow_more.svg"}
              alt="more"
            />
          </button>
        </div>
      </div>
    </CollectionWrap>
  );
};

export default CollectionProd;
