import "./App.css";
import React, { useEffect, useState } from "react";
import ContentBLock from "./components/ContentBlock/ContentBlock.jsx";
import { Layout } from "antd";

import { GenresProvider } from "./components/genres-context/genres-context.jsx";
import { RatedListProvider } from "./components/ratedList-context/ratedList-context.jsx";

const { Content } = Layout;

const App = () => {
  const [state, setState] = useState({ genres: [], rated: [] });

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGZhZTllZDM5ZGQwNDUzMTQ5MGY2ODY2NzkzMGY4NiIsInN1YiI6IjY1NWRkYThiN2YyZDRhMDBhYzY0MDk2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KAzabptwmfTNp_PHNiG-Ej1OUi7U9Ixy5KbuxCWb_Hs",
      },
    };

    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((response) => response.json())
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
