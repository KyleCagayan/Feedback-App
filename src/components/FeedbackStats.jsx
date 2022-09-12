import React from "react";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

export default function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext)

  // calculate ratings average (accumulator, current)
  let average =
    feedback.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0) / feedback.length;

  average = average.toFixed(1).replace(/[.,]0#/, ""); // always makes rating ONE decimal place unless whole number.

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  );
}