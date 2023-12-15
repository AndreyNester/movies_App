import { debounce } from "lodash";

import NavigationTab from "../NavigationTab/NavigationTab";
import BodyCotent from "../BodyContent/BodyContent";

import RatedList from "../RatedList/RatedList";

import "./ContentBlock.css";
import React from "react";
import searchOn from "../../requests/searchOn/searchOn";

export default class ContentBlock extends React.Component {
  state = {
    isLoading: false,
    isConnected: true,
    data: [],
    inputValue: "",
    someFound: true,
    currentPage: 1,
    totalPages: 0,
    switchedOn: "#Search",
  };

  searchDelay = 1500;

  onSearch = () => {
    const { inputValue, currentPage } = this.state;
    if (inputValue) {
      this.setState((prevState) => {
        return {
          ...prevState,
          isLoading: true,
        };
      });

      searchOn(currentPage, inputValue)
        .then((response) => {
          this.setState((oldState) => {
            return {
              ...oldState,
              isLoading: false,
              data: response.results,
              someFound: response.results.length ? true : false,
              totalPages: response.total_results ? response.total_pages : 0,
            };
          });
        })
        .catch((err) => {
          this.setState((oldState) => {
            console.log(err);
            return {
              ...oldState,
              isLoading: false,
              isConnected: false,
            };
          });
        });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          data: [],
          someFound: true,
          totalPages: 0,
        };
      });
    }
  };

  onDelayedSearch = debounce(() => {
    this.onSearch();
  }, this.searchDelay);

  onChangeInput = (e) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        inputValue: e.target.value,
      };
    });
  };

  onChangePag = (page) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          currentPage: page,
        };
      },
      () => this.onSearch()
    );
  };

  onSwitch = (link) => {
    if (link === "#Search") {
      this.setState((prevState) => {
        return {
          ...prevState,
          switchedOn: "#Search",
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          switchedOn: "#Rated",
        };
      });
    }
  };

  render() {
    const {
      isLoading,
      data,
      isConnected,
      inputValue,
      someFound,
      currentPage,
      totalPages,
      switchedOn,
    } = this.state;

    const BodyCotentProps = {
      switchedOn: switchedOn,
      inputValue: inputValue,
      onDelayedSearch: this.onDelayedSearch,
      onChangeInput: this.onChangeInput,
      someFound: someFound,
      isLoading,
      isConnected,
      data,
      currentPage,
      totalPages,
      onChangePag: this.onChangePag,
    };

    return (
      <>
        <NavigationTab onSwitch={this.onSwitch} />
        <BodyCotent BodyCotentProps={BodyCotentProps} />
        <RatedList switchedOn={switchedOn} />
      </>
    );
  }
}
