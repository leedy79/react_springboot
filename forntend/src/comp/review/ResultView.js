import React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";

function ResultView({ result }) {
  if (!result) {
    return <p className="text-muted">결과가 없습니다.</p>;
  }

  return (
    <div>
      <h3 className="mb-3">분석 결과</h3>
      <p>
        <strong>입력 리뷰:</strong> {result.review}
      </p>
      <p>
        <strong>감성 점수:</strong> {result.sentiment}
      </p>

      <h4 className="mt-4 mb-2">유사 리뷰 추천</h4>
      {result.recommendations && result.recommendations.length > 0 ? (
        <ul className="list-group">
          {result.recommendations.map((item, idx) => (
            <li
              key={idx}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.review_text}
              <span className="badge bg-success rounded-pill">
                {item.sentiment_score}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">추천 리뷰가 없습니다.</p>
      )}
    </div>
  );
}

export default ResultView;
