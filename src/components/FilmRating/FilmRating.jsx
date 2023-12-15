import React from "react";

export default class FilmRating extends React.Component {
  render() {
    const { rating } = this.props;
    return (
      <div
        className={
          rating >= 0 && rating < 3
            ? "Description__rating_zero-three"
            : rating > 3 && rating < 5
              ? "Description__rating_three-five"
              : rating > 5 && rating < 7
                ? "Description__rating_five-seven"
                : "Description__rating_seven"
        }
      >
        <span>{rating.toFixed(1)}</span>
      </div>
    );
  }
}
