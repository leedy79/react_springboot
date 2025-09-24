import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import store, {changeName, increase} from './store.js'
import { addCount, decreaseCount, deleteItem, sortName } from "../store.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../comp/Sticky";
import Footer from "../comp/Footer";

function Cart() {
  const {
    user: { name, age },
    cart,
  } = useSelector((state) => state);

  let dispatch = useDispatch();

  const smallProdcuctStyle = {
    border: "1px solid #ddd",
    width: "100px",
    height: "80px",
    cursor: "pointer",
  };

  let textverticalAlign = {
    verticalAlign: "middle",
    textAlign: "center",
  };

  return (
    <>
      <Header />
      <div class="container">
        <div class="row">
          <div class="col-sm-12" style={{ textAlign: "center" }}>
            {/* 사용자 이름과 나이 보여주기 */}
            <h5 style={{ padding: "50px" }}>
              {/* {name} {age}의 장바구니/ */}
              {name}의 장바구니
            </h5>
            <Table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>상품이미지</th>
                  <th>상품명</th>
                  <th>수량</th>
                  <th>변경하기</th>
                </tr>
              </thead>
              <tbody>
                {/* 장바구니에 있는 상품 목록 출력 */}
                {cart.map(({ id, image, name, count }, i) => (
                  <tr key={i}>
                    <td style={textverticalAlign}>{id}</td>
                    {/* 이미지 클릭 시 해당 상품 상세 페이지로 이동 */}
                    <td>
                      <Link to={`/product/${id}`}>
                        <img
                          src={process.env.PUBLIC_URL + "/" + image}
                          style={smallProdcuctStyle}
                          alt=""
                        />
                      </Link>
                    </td>
                    {/* 상품명, 수량 보여주기 */}
                    <td style={textverticalAlign}>{name}</td>
                    <td style={textverticalAlign}>{count}</td>

                    <td style={textverticalAlign}>
                      {/* 상품수량  + 버튼 */}
                      <Button
                        onClick={() => {
                          dispatch(addCount(id));
                        }}
                        variant="outline-success"
                        style={{ marginRight: "10px" }}
                      >
                        +
                      </Button>

                      {/* 상품수량  - 버튼 */}
                      <Button
                        onClick={() => {
                          dispatch(decreaseCount(id));
                        }}
                        variant="outline-warning"
                        style={{ marginRight: "10px" }}
                      >
                        -
                      </Button>

                      {/* 상품 삭제 버튼 */}
                      <Button
                        onClick={() => {
                          dispatch(deleteItem(id));
                        }}
                        variant="outline-danger"
                      >
                        상품삭제
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* 이름순으로 정렬하는 버튼 */}
            <Button
              variant="outline-primary"
              onClick={() => {
                dispatch(sortName());
              }}
            >
              이름순정렬
            </Button>{" "}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
