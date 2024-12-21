import React from "react";
import MovieList from "../Components/MovieList/MovieList";


const Latest = () => {
  return <MovieList endpoint="movie/upcoming" sortCriteria="release_date" />;
};

export default Latest;
