import React from "react";
import { Offline, Online } from "react-detect-offline";
import { Col, Row, Spin, Alert, Input, Pagination } from "antd";
import Description from "../Description/Description";

export default class BodyCotent extends React.Component {
  render() {
    const {
      switchedOn,
      inputValue,
      onDelayedSearch,
      onChangeInput,
      someFound,
      isLoading,
      isConnected,
      data,
      currentPage,
      totalPages,
      onChangePag,
    } = this.props;
    const rowStyle = {
      marginBottom: "auto",
    };
    const styleForDescriptionLay = {
      height: "279px",
      boxShadow: "4px 4px 10px 5px #D9D9D9",
      display: "flex",
      justifyContent: "flex-end",
    };

    const pagStyle = {
      display: "flex",
      justifyContent: " center",
      marginTop: "20px",
    };
    return (
      <div
        className="contentBlock__search"
        style={{ display: switchedOn === "#Search" ? "block" : "none" }}
      >
        <Input
          value={inputValue}
          placeholder="Search films"
          onKeyUp={() => onDelayedSearch()}
          onChange={(e) => {
            onChangeInput(e);
          }}
        />
        <h1 className={someFound ? "noFoundMarker hidden" : "noFoundMarker"}>
          No films found
        </h1>
        <br />
        <br />
        <Offline>
          <Alert type="error" message="Error text" banner />
        </Offline>
        <div className={isLoading ? "spinner loading" : "spinner"}>
          <Spin tip="Loading" size="large">
            <div className="spinner__content" />
          </Spin>
        </div>
        <div
          className={
            isConnected
              ? "contentBlock__alert"
              : "contentBlock__alert connected"
          }
        >
          <Online>
            <Alert
              message="can not recive data from server"
              description="may be server does not work in your country"
              type="warning"
            />
          </Online>
        </div>
        <Row gutter={[40, 40]} style={rowStyle}>
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
              <div style={styleForDescriptionLay}>
                <Description element={el} />
              </div>
            </Col>
          ))}
        </Row>
        <Pagination
          current={currentPage}
          total={totalPages * 10}
          style={pagStyle}
          className={!totalPages ? "hidden" : null}
          onChange={(page) => {
            onChangePag(page);
          }}
        />
      </div>
    );
  }
}
