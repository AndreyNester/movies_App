import React from "react";
import { RatedListConsumer } from "../ratedList-context/ratedList-context";
import { Col, Row } from "antd";
import Description from "../Description/Description";
import { Pagination } from "antd";

import "./ratedList.css";

export default class BodyCotent extends React.Component {
  state = {
    bunchNumber: 0,
  };

  render() {
    const { switchedOn } = this.props;
    const { bunchNumber } = this.state;

    return (
      <div
        className={`contentBlock__rated ${
          switchedOn === "#Rated" ? "displayBlock" : "displayNone"
        }`}
      >
        <RatedListConsumer>
          {(value) => {
            const test = value.rate.reduce((acc, el, index) => {
              if (index % 20 === 0) {
                return (acc = [...acc, [el]]);
              } else {
                acc[acc.length - 1].push(el);
                return acc;
              }
            }, []);
            return (
              <>
                <Row gutter={[40, 40]} className="description__list">
                  {test.length
                    ? test[bunchNumber].map((el) => (
                        <Col
                          key={el.id}
                          xs={24}
                          sm={24}
                          md={24}
                          lg={12}
                          xl={12}
                          className="gutter-row"
                          span={12}
                        >
                          <div className="description__wrapper">
                            <Description element={el} />
                          </div>
                        </Col>
                      ))
                    : null}
                </Row>
                <Pagination
                  current={bunchNumber + 1}
                  total={test.length * 10}
                  className="reatedList__pagination"
                  onChange={(number) =>
                    this.setState(
                      (prevState) => (prevState.bunchNumber = number - 1)
                    )
                  }
                />
              </>
            );
          }}
        </RatedListConsumer>
      </div>
    );
  }
}
