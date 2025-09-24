import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";

function ReviewForm({ onResult }) {
  const [review, setReview] = useState("");

  const handleSubmit = async () => {
    if (!review.trim()) {
      return alert("리뷰를 입력하세요");
    }

    try {
      const res = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return alert(`분석 실패: ${errorData.message || res.statusText}`);
      }

      const data = await res.json();
      onResult(data);
      setReview("");
    } catch (error) {
      alert("서버와 연결할 수 없습니다: " + error.message);
    }
  };

  return (
    <div className="mb-4">
      <textarea
        className="form-control mb-2"
        rows="4"
        placeholder="리뷰를 입력하세요"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSubmit}>
        감성 분석
      </button>
    </div>
  );
}

export default ReviewForm;
