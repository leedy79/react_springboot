import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Product from "./pages/Product";
import Collection from "./pages/Collection";
import ScrollToTop from "./comp/ScrollToTop";
import Cart from "./comp/Cart";
import BoardList from "./comp/board/BoardList";
import NewBoardForm from "./comp/board/NewBoardForm";
import UpdateBoardForm from "./comp/board/UpdateBoardForm";
import NavigationBar from "./comp/NavigationBar";
import LoginForm from "./comp/LoginForm";
import SignupForm from "./comp/SignupForm";
import BoardView from "./comp/board/BoardView";
import ReView from "./comp/review/Review";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/collection" element={<Collection />}></Route>
        <Route path="/collection/:cId" element={<Collection />}></Route>
        <Route path="/product/:pId" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/board" element={<BoardList />}></Route>
        <Route path="/new" element={<NewBoardForm />} />
        <Route path="/edit/:id" element={<UpdateBoardForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/view/:id" element={<BoardView />} />
        <Route path="/review" element={<ReView />} />
      </Routes>
    </>
  );
}

export default App;
