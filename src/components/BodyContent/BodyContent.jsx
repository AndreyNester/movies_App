import React from "react";

import { Input, Pagination } from "antd";

import ErrorsComponent from "../ErrorsComponent/ErrorsComponent";
import ResultList from "../ResultList/ResultList";
import Spinner from "../Spinner/Spinner";

export default class BodyCotent extends React.Component {
  render() {
    const {
      BodyCotentProps: {
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
      },
    } = this.props;

    return (
      <div
        className={`contentBlock__search ${
          switchedOn === "#Search" ? "displayBlock" : "displayNone"
        }`}
      >
        <Input
          className="Content__input"
          value={inputValue}
          placeholder="Search films"
          onKeyUp={() => onDelayedSearch()}
          onChange={(e) => {
            onChangeInput(e);
          }}
        />
        <h2 className={someFound ? "noFoundMarker hidden" : "noFoundMarker"}>
          No films found
        </h2>
        <ErrorsComponent isConnected={isConnected} />

        <Spinner isLoading={isLoading} />

        <ResultList data={data} />

        <Pagination
          className={`pagination ${!totalPages ? "hidden" : ""}`}
          current={currentPage}
          total={totalPages * 10}
          onChange={(page) => {
            onChangePag(page);
          }}
        />
      </div>
    );
  }
}
