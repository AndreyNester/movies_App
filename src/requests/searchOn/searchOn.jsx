function searchOn(currentPage, inputValue) {
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
  return fetch(
    `https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false&language=en-US&page=${page}`,
    options
  ).then((response) => response.json());
}

export default searchOn;
