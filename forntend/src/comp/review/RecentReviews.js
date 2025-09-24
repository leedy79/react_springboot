import React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";

function RecentReviews({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-muted">최근 리뷰가 없습니다.</p>;
  }

  return (
    <div>
      <h5>최근 리뷰</h5>
      <ul className="list-group">
        {reviews.map((r, idx) => (
          <li
            key={idx}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {r.review_text}
            <span className="badge bg-primary rounded-pill">
              {r.sentiment_score}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentReviews;
