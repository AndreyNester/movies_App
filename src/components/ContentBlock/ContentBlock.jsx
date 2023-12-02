import { Col, Row, Spin, Alert, Input, Pagination, Anchor } from "antd";
import Description from "../Description/Description";
import { Offline, Online } from "react-detect-offline";
import { debounce } from "lodash";
import { RatedListConsumer } from "../ratedList-context/ratedList-context";

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

    const rowStyle = {
      marginBottom: "auto",
    };
    return (
      <>
        <nav className="contentBlock__nav">
          <Anchor
            onClick={(e, link) => this.onSwitch(link.href)}
            direction="horizontal"
            items={[
              {
                key: "part-1",
                href: "#Search",
                title: "Search",
              },
              {
                key: "part-2",
                href: "#Rated",
                title: "Rated",
              },
            ]}
          />
        </nav>
        <div
          className="contentBlock__search"
          style={{ display: switchedOn === "#Search" ? "block" : "none" }}
        >
          <Input
            value={inputValue}
            placeholder="Search films"
            onKeyUp={() => this.onDelayedSearch()}
            onChange={(e) => {
              this.onChangeInput(e);
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
              this.onChangePag(page);
            }}
          />
        </div>
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
      </>
    );
  }
}
