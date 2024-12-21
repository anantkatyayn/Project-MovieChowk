import React from "react";
import MovieList from "../Components/MovieList/MovieList";


const TopRated = () => {
  return <MovieList endpoint="movie/top_rated" sortCriteria="vote_average" />;
};

export default TopRated;
