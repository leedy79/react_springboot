//import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Header from "../Sticky";
import Footer from "../Footer";
import ReviewForm from "../../comp/review/ReviewForm";
import RecentReviews from "../../comp/review/RecentReviews";
import ResultView from "../../comp/review/ResultView";

function Review() {
  const [recentReviews, setRecentReviews] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => setRecentReviews(data))
      .catch((err) => console.error("최근 리뷰 가져오기 실패", err));
  }, []);

  const handleAnalysisResult = (data) => {
    setResult(data);
    // 분석 요청 후 최근 리뷰도 갱신
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => setRecentReviews(data));
  };

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2> 최근 리뷰 5개</h2>
        <RecentReviews reviews={recentReviews} />

        <h2>리뷰 작성</h2>
        <ReviewForm onResult={handleAnalysisResult} />

        {result && <ResultView result={result} />}
      </div>
      <Footer />
    </>
  );
}
export default Review;
