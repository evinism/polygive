import React from "react";
import "./CharityRating.css";

const SUPERB_RATING = 95;
const GOOD_RATING = 70;
const BORDERLINE_RATING = 60;

const CharityRating = ({ rating }: { rating: number | undefined }) => {
  if (rating === undefined) {
    return <span className="charity-rating unknown">Unknown</span>;
  }
  let ratingClass = "bad";
  if (rating >= SUPERB_RATING) {
    ratingClass = "superb";
  } else if (rating >= GOOD_RATING) {
    ratingClass = "good";
  } else if (rating >= BORDERLINE_RATING) {
    ratingClass = "borderline";
  }
  return (
    <span className={`charity-rating ${ratingClass}`}>{rating} / 100</span>
  );
};

export default CharityRating;
