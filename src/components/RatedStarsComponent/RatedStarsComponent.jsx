import React from "react";
import { RatedListConsumer } from "../ratedList-context/ratedList-context";
import { Rate } from "antd";

export default class RatedStarsComponent extends React.Component {
  render() {
    const { element, id } = this.props;
    return (
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
    );
  }
}
