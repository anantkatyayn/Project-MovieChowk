import React from "react";
import MovieList from "../Components/MovieList/MovieList";


const Popular = () => {
  return <MovieList endpoint="movie/popular" sortCriteria="popularity" />;
};

export default Popular;
