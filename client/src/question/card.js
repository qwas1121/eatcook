import React from "react";

const MovieCard = ({ item }) => {
  const { title, link, description, postdate, userRating } = item;
  return (
    <div className="movie-card-container">
      <div className="movie-image"></div>
      <div className="movie-text">
        <h2>{title}</h2>
        <div>{`${postdate}년도`}</div>
        <div className="movie-summary-row">
          <h5>{description}</h5>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
