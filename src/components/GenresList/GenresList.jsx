import React from "react";
import { GenresConsumer } from "../genres-context/genres-context";

export default class Description extends React.Component {
  render() {
    const { genreIds } = this.props;
    return (
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
    );
  }
}
