import "./App.css";
import React, { useEffect, useState } from "react";
import ContentBLock from "./components/ContentBlock/ContentBlock.jsx";
import { Layout } from "antd";

import { GenresProvider } from "./components/genres-context/genres-context.jsx";
import { RatedListProvider } from "./components/ratedList-context/ratedList-context.jsx";
import getGenres from "./requests/getGenres/getGenres.jsx";

const { Content } = Layout;

const App = () => {
  const [state, setState] = useState({ genres: [], rated: [] });
  console.log(state);

  useEffect(() => {
    getGenres()
      .then((response) => {
        setState((prevState) => {
          return {
            ...prevState,
            genres: response.genres,
          };
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const onRated = (ratedItem, rate) => {
    setState((prevState) => {
      if (prevState.rated.find((el) => el.id === ratedItem.id)) {
        const idx = prevState.rated.findIndex((el) => el.id === ratedItem.id);
        const newArr = [...prevState.rated];
        newArr[idx] = { ...ratedItem, rate };
        return {
          ...prevState,
          rated: newArr,
        };
      } else
        return {
          ...prevState,
          rated: [...prevState.rated, { ...ratedItem, rate }],
        };
    });
  };

  return (
    <Layout className="layout">
      <GenresProvider value={state.genres}>
        <Content className="app__layout">
          <div className="site-layout-content">
            <RatedListProvider value={{ onRated, rate: state.rated }}>
              <ContentBLock />
            </RatedListProvider>
          </div>
        </Content>
      </GenresProvider>
    </Layout>
  );
};
export default App;
