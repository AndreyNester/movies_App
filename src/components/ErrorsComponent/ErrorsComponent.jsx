import { Offline, Online } from "react-detect-offline";
import { Alert } from "antd";
import React from "react";

export default class ErrorsComponent extends React.Component {
  render() {
    const { isConnected } = this.props;
    return (
      <>
        <Offline>
          <Alert type="error" message="something wrong" banner />
        </Offline>
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
      </>
    );
  }
}
