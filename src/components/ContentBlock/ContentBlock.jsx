import { debounce } from "lodash";

import NavigationTab from "../NavigationTab/NavigationTab";
import BodyCotent from "../BodyContent/BodyContent";

import RatedList from "../RatedList/RatedList";

import "./ContentBlock.css";
import React from "react";

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
      const _ApiReadAccessToken =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGZhZTllZDM5ZGQwNDUzMTQ5MGY2ODY2NzkzMGY4NiIsInN1YiI6IjY1NWRkYThiN2YyZDRhMDBhYzY0MDk2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KAzabptwmfTNp_PHNiG-Ej1OUi7U9Ixy5KbuxCWb_Hs";
      const page = currentPage;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${_ApiReadAccessToken}`,
        },
      };

      this.setState((prevState) => {
        return {
          ...prevState,
          isLoading: true,
        };
      });

      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false&language=en-US&page=${page}`,
        options
      )
        .then((response) => response.json())
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

    return (
      <>
        <NavigationTab onSwitch={this.onSwitch} />
        <BodyCotent
          switchedOn={switchedOn}
          inputValue={inputValue}
          onDelayedSearch={this.onDelayedSearch}
          onChangeInput={this.onChangeInput}
          someFound={someFound}
          isLoading={isLoading}
          isConnected={isConnected}
          data={data}
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePag={this.onChangePag}
        />

        <RatedList switchedOn={switchedOn} />
      </>
    );
  }
}
