import React from "react";
import { Spin } from "antd";

export default class Spinner extends React.Component {
  render() {
    const { isLoading } = this.props;
    return (
      <div className={isLoading ? "spinner loading" : "spinner"}>
        <Spin tip="Loading" size="large">
          <div className="spinner__content" />
        </Spin>
      </div>
    );
  }
}
