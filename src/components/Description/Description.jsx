import React from "react";
import "./Description.css";
import { format } from "date-fns";
import { GenresConsumer } from "../genres-context/genres-context";
import { Rate } from "antd";
import { RatedListConsumer } from "../ratedList-context/ratedList-context";

export default class Description extends React.Component {
  validateOverview = (text) => {
    const validate = text
      .split("")
      .reduce(
        (acc, el, index, arr) => {
          if (index > 175 && el === " ") {
            acc.spacedAfterMax = true;
          }
          if (index === arr.length - 1 && acc.spacedAfterMax) {
            return {
              ...acc,
              data: [...acc.data, "..."],
            };
          }
          if (acc.spacedAfterMax) {
            return acc;
          }

          return {
            ...acc,
            data: [...acc.data, el],
          };
        },
        { data: [], spacedAfterMax: false }
      )
      .data.join("");
    return validate;
  };

  render() {
    const {
      element,
      element: {
        original_title: originalTitle,
        overview,
        release_date: releaseDate,
        poster_path: postePath,
        vote_average: rating,
        genre_ids: genreIds,
        id,
      },
    } = this.props;

    return (
      <>
        <img
          className="description__poster-large"
          src={`https://image.tmdb.org/t/p/original/${postePath}`}
          alt="some"
        />
        <div
          className="Description__description"
          style={{
            width: "350px",
            padding: "20px",
          }}
        >
          <div className="Description__content-main">
            <div className="Description__info">
              <img
                className="description__poster-small"
                src={`https://image.tmdb.org/t/p/original/${postePath}`}
                alt="some"
              />
              <div className="Description__header">
                <div className="Description__title-taring">
                  <h1 className="Description__title">{originalTitle}</h1>
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
                </div>
                <time className="Description__time">
                  {releaseDate
                    ? format(new Date(releaseDate), "MMMM dd, yyyy")
                    : null}
                </time>
                <div className="Description__genres">
                  <GenresConsumer>
                    {(value) => {
                      return (
                        <>
                          {genreIds.map((el) => (
                            <span key={el} className="Description__genre">
                              {value.find((elem) => el === elem.id).name}
                            </span>
                          ))}
                        </>
                      );
                    }}
                  </GenresConsumer>
                </div>
              </div>
            </div>
            <p className="Description__text">
              {this.validateOverview(overview)}
            </p>
          </div>
          <RatedListConsumer>
            {(value) => {
              return (
                <Rate
                  count={10}
                  value={
                    value.rate.find((elem) => elem.id === id)
                      ? value.rate.find((elem) => elem.id === id).rate
                      : 0
                  }
                  className="Description__setRating"
                  onChange={(number) => value.onRated(element, number)}
                />
              );
            }}
          </RatedListConsumer>
        </div>
      </>
    );
  }
}
