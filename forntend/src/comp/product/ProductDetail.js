import React from "react";
import styled from "styled-components";
import data from "../../db/collectionProd.js";
import { useState, useEffect } from "react";
import { addItem } from "../../store.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";

const CategoryWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 5px;
  padding-top: 35px;
  justify-content: center;
  align-items: center;
  .category {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .categoryName {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .categoryName:not(:first-of-type)::before {
    content: "/";
    margin: 0 10px;
    font-size: 22px;
    font-weight: 100;
    color: #5d5d5d;
  }
  .categoryName img {
    width: 24px;
    height: 24px;
  }
  .categoryName span {
    font-size: 15px;
    margin-right: 8px;
  }
`;
const ProductPurchaseWrap = styled.div`
  min-width: 900px;
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px 50px 0;
  .brand-box {
    margin-bottom: 16px;
  }
  .brand-link {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .brand-link img {
    width: 74px;
    height: 74px;
  }
  .brand-info-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 14px;
  }
  .brand {
    font-size: 16px;
    font-weight: 600;
  }
  .desc {
    font-size: 13px;
  }
  .brand-home {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    margin-top: 6px;
  }
  .brand-home-btn {
    min-width: 40px;
    min-height: 25px;
    display: inline;
    padding: 0 9px;
    font-size: 11px;
    border: 1px solid #d4d4d4;
    border-radius: 2px;
  }
  .purchase-detail-box {
    display: flex;
    align-items: flex-start;
    width: 100%;
  }
  .purchase-img-box {
    visibility: visible;
    position: relative;
  }
  .product-img-box {
    width: 564px;
    height: 596px;
    position: relative;
    display: block;
  }
  .product-img-slider {
    overflow: hidden;
    position: relative;
    z-index: 0;
    visibility: visible;
    user-select: none;
  }
  .img-slider-box {
    backface-visibility: hidden;
    display: flex;
    height: 100%;
    margin: 0 !important;
    padding: 0 !important;
  }
  .img-slider-item {
    backface-visibility: hidden;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    flex-shrink: 0;
  }
  .slider-img-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .slider-img-box img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* vertical-align: bottom; */
  }
  .product-img-slider-btn {
    display: block;
    visibility: visible;
  }
  .slider-btn-l {
    opacity: 0.35;
    cursor: not-allowed;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    min-height: 25px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 15px;
    background-color: #ffffff;
    left: 0;
  }
  .slider-btn-r {
    opacity: 0.35;
    cursor: not-allowed;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    min-height: 25px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 15px;
    background-color: #ffffff;
    right: 0;
  }
  .product-img-presentation {
    position: unset;
    padding-top: 16px;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0;
    pointer-events: none;
  }
  .product-img-presentation li {
    display: inline-block;
    line-height: 1;
    list-style-type: none;
    margin: 0;
    pointer-events: auto;
  }
  .product-img-presentation button {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: #e4e4e4;
    border-radius: 50%;
    transition: none;
    background: #ccc;
    border: 0;
    border-radius: 50%;
    display: inline-block;
    opacity: 0.7;
    position: relative;
  }
  .purchase-box {
    flex: 1;
    width: 100%;
    padding-left: 45px;
  }
  .purchase-box-inner-1 {
    display: flex;
    justify-content: space-between;
    border-top: 2px solid #000000;
  }
  .purchase-box-inner-1 h2 {
    font-weight: 600;
    padding: 24px 0;
    padding-right: 34px;
  }
  .btn-like {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 85px;
    height: 100%;
    border-left: 1px solid #e4e4e4;
    border-image-repeat: stretch;
  }
  .btn-like img {
    width: 26px;
    height: 26px;
  }
  .rating-box {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }
  .rating-star-box {
    margin-right: 12px;
  }
  .rating-stars {
    display: inline-flex;
    align-items: center;
  }
  .rating-box button {
    display: inline-block;
    height: 14px;
    border-bottom: 0.5px solid #5d5d5d;
    color: #474747;
    font-size: 11px;
    line-height: 14px;
  }
  .purchase-box-inner-2 {
    display: flex;
    align-items: end;
    justify-content: space-between;
  }
  .price-box {
    position: relative;
    flex: 1;
  }
  .prev-price {
    display: block;
    font-weight: 400;
    line-height: 140%;
    font-size: 13px;
    color: #a0a0a0;
    text-decoration-line: line-through;
  }
  .elem-text {
    display: block;
    margin-top: 4px;
    font-weight: 700;
    line-height: 140%;
    font-size: 13px;
    color: #ff4800;
  }
  .price-info-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .price-info-inner {
    display: flex;
    gap: 4px;
    align-items: center;
  }
  .sale {
    font-weight: 700;
    line-height: 136%;
    font-size: 20px;
    margin-right: 2px;
    color: #ff4800;
  }
  .price {
    font-weight: 700;
    line-height: 136%;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  .price > span {
    font-size: 16px;
    line-height: 140%;
    font-weight: 700;
  }
  .coupon-box {
    display: inline-block;
    top: 50%;
    right: 0;
    position: absolute;
  }
  .coupon-box button {
    font-weight: 400;
    font-size: 11px;
    line-height: 136%;
    padding: 6px 10px;
    position: relative;
    border-radius: 2px;
    gap: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 28px;
    color: white;
    background-color: #000000;
  }
  .btn-img-box {
    width: 12px;
    height: 12px;
  }
  .btn-img-box img {
    width: 100%;
    height: 100%;
  }
  .btn-img-box span {
    color: #ffffff;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .purchase-box-inner-3 {
    position: relative;
    padding: 0px 14px;
    background-color: #f4f4f4;
    border-radius: 6px;
    margin-top: 16px;
  }
  .price-box-2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 12px 0;
    background-color: #f4f4f4;
    border-radius: 6px;
  }
  .price-more-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
  }
  .price-more-box h3 {
    font-size: 13px;
    line-height: 140%;
    font-weight: 500;
    color: #474747;
  }
  hr {
    display: inline-flex;
    width: 100%;
    height: 1px;
    background-color: #f4f4f4;
  }
  .mileage {
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding-bottom: 16px;
  }
  .mileage h3 {
    display: inline-block;
    flex-shrink: 0;
    align-self: flex-start;
    width: 110px;
    font-weight: 600;
    font-size: 13px;
    color: #474747;
  }
  .mileage span {
    font-weight: 500;
    font-size: 13px;
    color: #474747;
  }
  .installment {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
  }
  .installment h3 {
    display: inline-block;
    flex-shrink: 0;
    align-self: flex-start;
    width: 110px;
    font-weight: 600;
    font-size: 13px;
    color: #474747;
  }
  .installment-btn {
    display: flex;
    align-items: center;
  }
  .installment span {
    font-weight: 500;
    font-size: 13px;
    color: #474747;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .delivery-box {
    padding-bottom: 20px;
  }
  .delivery-info {
    position: relative;
    display: flex;
    margin-bottom: 16px;
  }
  .delivery-info-title {
    display: flex;
    flex-shrink: 0;
    align-self: flex-start;
    width: 110px;
    font-weight: 600;
    font-size: 13px;
    color: #474747;
  }
  .delivery-start {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 2px;
  }
  .delivery-start-inner {
    display: flex;
    gap: 4px;
    align-items: center;
  }
  .delivery-start span {
    display: inline-block;
    font-weight: 500;
    font-size: 13px;
    color: #735fff;
  }
  .delivery-price-info-box {
    position: relative;
    display: flex;
  }
  .delivery-price-info-box {
    position: relative;
    display: flex;
  }
  .delivery-price-box {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 2px;
  }
  .delivery-price {
    display: inline-block;
    font-weight: 500;
    font-size: 13px;
    color: #735fff;
  }
  .delivery-text {
    display: inline-block;
    font-weight: 500;
    font-size: 13px;
    color: #474747;
  }
  .purchase-wrap {
    padding: 20px 0;
  }
  .purchase-select-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .purchase-select-item-box {
    position: relative;
    width: 100%;
    margin-bottom: 4px;
  }
  .purchase-select-item {
    position: relative;
    cursor: pointer;
  }
  .purchase-select-item input {
    display: block;
    width: 100%;
    border: 1px solid rgb(212, 212, 212);
    outline: none;
    cursor: pointer;
    height: 36px;
    padding: 0px 30px 0px 14px;
    font-size: 13px;
    color: rgb(48, 48, 51);
    background: transparent;
  }
  .purchase-select-item img {
    display: initial;
    vertical-align: initial;
    pointer-events: none;
    position: absolute;
    top: 50%;
    right: 14px;
    width: 12px;
    height: 6px;
    margin-top: -4px;
    line-height: 6px;
  }
  .cart-purchase-box {
    display: flex;
    padding-top: 16px;
  }
  .cart_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    min-height: 25px;
    width: 100%;
    height: 50px;
    font-size: 14px;
    font-weight: 600;
    color: #000000;
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    flex: 1;
  }
  .purchase_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    min-height: 25px;
    width: 100%;
    height: 50px;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    background-color: #000000;
    box-shadow: 10px 10px 16px 0 rgb(0 0 0 / 30%);
    flex: 1;
  }
  .purchase_btn:hover {
    background-color: #ff4800;
  }
`;
const ProductDetailInfoWrap = styled.section`
  margin: 0 auto;
  padding: 40px 50px 0;
  min-width: 900px;
  max-width: 1300px;
  .product-info-box {
    position: relative;
    border-bottom: 1px solid rgb(228, 228, 228);
  }
  .product-info-box-btn {
    min-width: 40px;
    min-height: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 54px;
    font-size: 17px;
    font-weight: 700;
    color: rgb(48, 48, 51);
  }
  .product-info-box-btn img {
    display: initial;
    vertical-align: initial;
    width: 12px;
    height: 6px;
  }
`;
const BannerWrap = styled.section`
  display: block;
  padding: 40px 0px;
  max-width: 1000px;
  min-width: 900px;
  margin: 0 auto;
  .banner-btn {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    position: relative;
    text-align: left;
    padding: 14px 16px 14px 32px;
    background-color: #5d5d5d14;
    border-radius: 2px;
    overflow: hidden;
    gap: 10px;
    align-items: center;
  }
  .banner-btn img {
    max-width: 100%;
    height: auto;
    display: initial;
    vertical-align: bottom;
    object-fit: cover;
    border-radius: 2px;
    aspect-ratio: 5 / 4;
  }
  .banner-btn-inner {
    display: flex;
    width: 174px;
    border-radius: 2px;
    margin-right: -16px;
    margin-top: -14px;
    margin-bottom: -14px;
  }
  .banner-text-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 1 0%;
  }
  .banner-text-1 {
    font-size: 24px;
    line-height: 136%;
    font-weight: 700;
  }
  .banner-text-2 {
    font-size: 20px;
    line-height: 136%;
    font-weight: 500;
    color: #474747;
  }
`;
const ProductDetailImgWrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 50px;
  .detail-img-box {
    display: block;
    width: fit-content;
    margin: 0 auto;
    text-align: center;
  }
  .detail-img-box img {
    max-width: 100%;
    vertical-align: top;
    object-fit: cover;
  }
`;

const ProductDetail = () => {
  const [item, setImg] = useState(data);
  const navigate = useNavigate();
  const { pId } = useParams();
  const location = useLocation();
  const product = location.state;
  const dispatch = useDispatch();

  if (!product) {
    return <div>상품 정보를 불러올 수 없습니다.</div>;
  }

  const { id, brand, image, name, discount, price, likes } = product;

  const rawPrice = price ? parseInt(price.replace(/,/g, ""), 10) : 0;

  const discountRate = discount
    ? parseFloat(discount.replace("%", "")) / 100
    : 0;
  const originalPrice = Math.round(rawPrice / (1 - discountRate));
  const formattedPrice = originalPrice.toLocaleString("ko-KR");

  return (
    <>
      <CategoryWrap>
        <ul className="category">
          <li className="categoryName">
            <span>여성의류</span>
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/more_circle.svg"}
              alt="categoryName"
            />
          </li>
          <li className="categoryName">
            <span>바지</span>
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/more_circle.svg"}
              alt="categoryName"
            />
          </li>
          <li className="categoryName">
            <span>트레이닝</span>
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/more_circle.svg"}
              alt="categoryName"
            />
          </li>
        </ul>
      </CategoryWrap>
      <ProductPurchaseWrap>
        <div className="brand-box">
          <a className="brand-link" href="">
            <img
              // src={process.env.PUBLIC_URL + "/img/detail/brand_img.webp"}
              src={process.env.PUBLIC_URL + "/" + image}
              alt=""
            />
            <div className="brand-info-box">
              <h3 className="brand">{brand}</h3>
              <p className="desc">{brand}는 당신의 삶을 풍요롭게 합니다.</p>
              <div className="brand-home">
                <button className="brand-home-btn">BRAND HOME</button>
              </div>
            </div>
          </a>
        </div>
        <div className="purchase-detail-box">
          <div className="product-img-box">
            <div className="product-img-slider">
              <ul className="img-slider-box">
                <li className="img-slider-item">
                  <div className="slider-img-box">
                    {/* <img
                      src={
                        process.env.PUBLIC_URL +
                        "/img/collection_product/1.webp"
                      }
                      alt=""
                    /> */}
                    <img src={process.env.PUBLIC_URL + "/" + image} alt="" />
                  </div>
                </li>
                <li className="img-slider-item">
                  <div className="slider-img-box">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/img/collection_product/2.webp"
                      }
                      alt=""
                    />
                  </div>
                </li>
                <li className="img-slider-item">
                  <div className="slider-img-box">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/img/collection_product/3.webp"
                      }
                      alt=""
                    />
                  </div>
                </li>
                <li className="img-slider-item">
                  {" "}
                  <div className="slider-img-box">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/img/collection_product/4.webp"
                      }
                      alt=""
                    />
                  </div>
                </li>
                <li className="img-slider-item">
                  {" "}
                  <div className="slider-img-box">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/img/collection_product/5.webp"
                      }
                      alt=""
                    />
                  </div>
                </li>
                <li className="img-slider-item">
                  {" "}
                  <div className="slider-img-box">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/img/collection_product/6.webp"
                      }
                      alt=""
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="product-img-slider-btn">
              <button className="slider-btn-l">
                <img
                  src={process.env.PUBLIC_URL + "/img/main_svg/arrow_l.svg"}
                  alt=""
                />
              </button>
              <button className="slider-btn-r">
                <img
                  src={process.env.PUBLIC_URL + "/img/main_svg/arrow_r.svg"}
                  alt=""
                />
              </button>
            </div>
            <ul className="product-img-presentation">
              <li>
                <button></button>
              </li>
              <li>
                <button></button>
              </li>
              <li>
                <button></button>
              </li>
              <li>
                <button></button>
              </li>
              <li>
                <button></button>
              </li>
              <li>
                <button></button>
              </li>
            </ul>
          </div>
          <div className="purchase-box">
            <div className="purchase-box-inner-1">
              <h2>{name}</h2>
              <div>
                <button className="btn-like">
                  <img
                    src={process.env.PUBLIC_URL + "/img/main_svg/like.svg"}
                    alt=""
                  />
                </button>
              </div>
            </div>
            <div className="rating-box">
              <div className="rating-star-box">
                <div className="rating-stars">
                  <img
                    src={process.env.PUBLIC_URL + "/img/main_svg/fill_star.svg"}
                    alt=""
                  />
                  <img
                    src={process.env.PUBLIC_URL + "/img/main_svg/fill_star.svg"}
                    alt=""
                  />
                  <img
                    src={process.env.PUBLIC_URL + "/img/main_svg/fill_star.svg"}
                    alt=""
                  />
                  <img
                    src={process.env.PUBLIC_URL + "/img/main_svg/fill_star.svg"}
                    alt=""
                  />
                  <img
                    src={process.env.PUBLIC_URL + "/img/main_svg/fill_star.svg"}
                    alt=""
                  />
                </div>
              </div>
              <button>{likes}개 리뷰 보기</button>
            </div>
            <div className="purchase-box-inner-2">
              <div className="price-box">
                {discount && (
                  <span className="prev-price">{formattedPrice}원</span>
                )}
                {discount && <span className="elem-text">첫 구매가</span>}
                <div className="price-info-box">
                  <div className="price-info-inner">
                    {discount && <span className="sale">{discount}</span>}
                    <span className="price">
                      {price}
                      <span>원</span>
                    </span>
                  </div>
                </div>
                <div className="coupon-box">
                  <button className="coupon-btn">
                    {/* <div className="btn-img-box">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/img/main_svg/get_coupon.svg"
                        }
                        alt=""
                      />
                    </div> */}
                    <span>쿠폰받기</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="purchase-box-inner-3">
              <button className="price-box-2">
                <div className="price-info-box">
                  <div className="price-info-inner">
                    <span className="sale">{discount}</span>
                    <span className="price">
                      {price}
                      <span>원</span>
                    </span>
                  </div>
                </div>
                <div className="price-more-box">
                  <h3>나의 구매 가능 가격</h3>
                  <div className="btn-img-box">
                    <img
                      src={
                        process.env.PUBLIC_URL + "/img/main_svg/arrow_down.svg"
                      }
                      alt=""
                    />
                  </div>
                </div>
              </button>
            </div>
            <hr></hr>
            <div className="mileage">
              <h3>구매 적립금</h3>
              <span>최대 670 마일리지 적립 예정</span>
            </div>
            <div className="installment">
              <h3>무이자 할부</h3>
              <button className="installment-btn">
                <span>카드사별 할부 혜택 안내</span>
              </button>
            </div>
            <ul className="delivery-box">
              <li className="delivery-info">
                <span className="delivery-info-title">
                  배송정보
                  <div>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        className="css-1udwh3t e6mvafa6"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill="#c4c4c4"
                          fillRule="evenodd"
                          d="M18.333 10a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15"
                          clipRule="evenodd"
                        />
                        <path
                          fill="#c4c4c4"
                          d="M8.984 12.274c.022-1.6.785-1.926 1.786-2.545.728-.452 1.153-.988 1.153-1.753 0-1.03-.836-1.718-1.887-1.71-.98-.008-1.858.618-1.916 1.807H7.083c.05-1.627 1.325-2.656 2.953-2.656 1.714 0 2.88 1.099 2.88 2.6 0 1.016-.49 1.726-1.44 2.324-.922.57-1.476.834-1.498 1.933v.237h-.994zm-.295 1.572c0-.41.353-.744.778-.751.418.007.763.34.763.751a.75.75 0 0 1-.763.737c-.425.007-.778-.334-.778-.737"
                        />
                      </svg>
                    </button>
                  </div>
                </span>
                <div className="delivery-start">
                  <div className="delivery-start-inner">
                    <span>
                      3<span>일 이내 출고</span>
                    </span>
                  </div>
                </div>
              </li>
              <li className="delivery-price-info-box">
                <span className="delivery-info-title">배송비</span>
                <div className="delivery-price-box">
                  <p className="delivery-price">3,500원</p>
                  <p className="delivery-text">
                    100,000원 이상 구매시 무료배송
                  </p>
                  <p className="delivery-text">제주/도서산간 3,000원 추가</p>
                </div>
              </li>
            </ul>
            <div className="purchase-wrap">
              <div className="purchase-select-box">
                <div className="purchase-select-item-box">
                  <div className="purchase-select-item">
                    <input type="text" placeholder="color" />
                    <img
                      src={
                        process.env.PUBLIC_URL + "/img/main_svg/arrow_down.svg"
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="purchase-select-box">
                  <div className="purchase-select-item-box">
                    <div className="purchase-select-item">
                      <input type="text" placeholder="size" />
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/img/main_svg/arrow_down.svg"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="cart-purchase-box">
                <button
                  className="cart_btn"
                  onClick={() => {
                    dispatch(
                      addItem({
                        id: id,
                        image: image,
                        name: name,
                        count: 1,
                      })
                    );
                  }}
                  style={{ marginRight: "10px" }}
                >
                  장바구니 담기
                </button>
                <button className="purchase_btn">바로 구매하기</button>
              </div>
            </div>
          </div>
        </div>
      </ProductPurchaseWrap>
      <ProductDetailInfoWrap>
        <section className="product-info-box">
          <button className="product-info-box-btn">
            상품정보
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/arrow_down.svg"}
              alt=""
            />
          </button>
        </section>
        <section className="product-info-box">
          <button className="product-info-box-btn">
            브랜드알림
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/arrow_down.svg"}
              alt=""
            />
          </button>
        </section>
        <section className="product-info-box">
          <button className="product-info-box-btn">
            사이즈정보
            <img
              src={process.env.PUBLIC_URL + "/img/main_svg/arrow_down.svg"}
              alt=""
            />
          </button>
        </section>
      </ProductDetailInfoWrap>
      <BannerWrap>
        <section>
          <button className="banner-btn">
            <div className="banner-btn-inner">
              <img
                src={process.env.PUBLIC_URL + "/img/detail/detail_banner.webp"}
                alt=""
              />
            </div>
            <div className="banner-text-box">
              <span className="banner-text-1">SUMMER COUNTDOWN</span>
              <span className="banner-text-2">
                최대 76%로 여름을 미리 준비하세요.
              </span>
            </div>
          </button>
        </section>
      </BannerWrap>
      <ProductDetailImgWrap>
        <section>
          <h2>상품설명</h2>
        </section>
        <div className="detail-img-box">
          <img
            src={process.env.PUBLIC_URL + "/img/detail/detail_" + id + ".jpg"}
            alt=""
          />
        </div>
      </ProductDetailImgWrap>
    </>
  );
};

export default ProductDetail;
