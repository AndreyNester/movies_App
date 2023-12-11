import React from "react";
import { RatedListConsumer } from "../ratedList-context/ratedList-context";
import { Col, Row } from "antd";
import Description from "../Description/Description";
export default class BodyCotent extends React.Component {
  render() {
    const { switchedOn } = this.props;
    const rowStyle = {
      marginBottom: "auto",
    };
    const styleForDescriptionLay = {
      height: "279px",
      boxShadow: "4px 4px 10px 5px #D9D9D9",
      display: "flex",
      justifyContent: "flex-end",
    };
    return (
      <div
        className="contentBlock__rated"
        style={{ display: switchedOn === "#Rated" ? "block" : "none" }}
      >
        <RatedListConsumer>
          {(value) => {
            return (
              <Row gutter={[40, 40]} style={rowStyle}>
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
                    <div style={styleForDescriptionLay}>
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
