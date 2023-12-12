import React from "react";
import { RatedListConsumer } from "../ratedList-context/ratedList-context";
import { Col, Row } from "antd";
import Description from "../Description/Description";
export default class BodyCotent extends React.Component {
  render() {
    const { switchedOn } = this.props;

    return (
      <div
        className={`contentBlock__rated ${
          switchedOn === "#Rated" ? "displayBlock" : "displayNone"
        }`}
      >
        <RatedListConsumer>
          {(value) => {
            return (
              <Row gutter={[40, 40]} className="description__list">
                {value.rate.map((el) => (
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
                ))}
              </Row>
            );
          }}
        </RatedListConsumer>
      </div>
    );
  }
}
