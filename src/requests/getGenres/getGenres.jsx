function getGenres() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGZhZTllZDM5ZGQwNDUzMTQ5MGY2ODY2NzkzMGY4NiIsInN1YiI6IjY1NWRkYThiN2YyZDRhMDBhYzY0MDk2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KAzabptwmfTNp_PHNiG-Ej1OUi7U9Ixy5KbuxCWb_Hs",
    },
  };

  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    options
  ).then((response) => response.json());
}

export default getGenres;
