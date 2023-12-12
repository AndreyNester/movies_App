import React from "react";
import Description from "../Description/Description";
import { Col, Row } from "antd";

export default class BodyCotent extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <Row gutter={[40, 40]} className="description__list">
        {data.map((el) => (
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
  }
}
