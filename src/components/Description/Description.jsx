import React from "react";
import "./Description.css";
import { format } from "date-fns";

import GenresList from "../GenresList/GenresList";

import RatedStarsComponent from "../RatedStarsComponent/RatedStarsComponent";

import FilmRating from "../FilmRating/FilmRating";

import { validateOverview } from "./utils/validateOverview";

export default class Description extends React.Component {
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
        <div className="Description__description">
          <div className="Description__content-main">
            <div className="Description__info">
              <img
                className="description__poster-small"
                src={`https://image.tmdb.org/t/p/original/${postePath}`}
                alt="some"
              />
              <div className="Description__header">
                <div className="Description__title-taring">
                  <h2 className="Description__title">{originalTitle}</h2>
                  <FilmRating rating={rating} />
                </div>
                <time className="Description__time">
                  {releaseDate
                    ? format(new Date(releaseDate), "MMMM dd, yyyy")
                    : null}
                </time>
                <GenresList genreIds={genreIds} />
              </div>
            </div>
            <p className="Description__text">{validateOverview(overview)}</p>
          </div>
          <RatedStarsComponent element={element} id={id} />
        </div>
      </>
    );
  }
}
