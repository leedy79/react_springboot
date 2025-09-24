import React from "react";
import styled from "styled-components";
import data from "../../db/mainLeft";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainLeftWrap = styled.div`
  /* position: relative; */
  /* background-color: grey; */
  /* display: block; */
  width: 44%;
  padding-right: 2%;
  /* max-height: 12000px; */
`;

const MainLeft = () => {
  //let [data, setData] = useState([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //   fetch(`/db/mainLeft.json`)
  //     .then((res) => res.json())
  //     .then((json) => setData(json))
  //     .catch((err) => console.error("데이터 로딩 오류", err));
  // }, []);

  return (
    <MainLeftWrap>
      <ul>
        {data.map((ele, i) => {
          return (
            <li key={ele.id}>
              <div
                className="collection"
                onClick={() => navigate(`/collection/${ele.id}`)}
              >
                <img src={process.env.PUBLIC_URL + "/" + ele.imgUrl} />
              </div>
            </li>
          );
        })}
      </ul>
    </MainLeftWrap>
  );
};

export default MainLeft;
