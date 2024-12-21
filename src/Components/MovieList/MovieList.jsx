import React, { useEffect, useState } from "react";
import "./MovieList.css";
import Card from "../Card/Card";
import PropTypes from "prop-types";

const DEFAULT_ENDPOINT = "movie/popular";

const endpointToHeading = {
  "movie/popular": "Popular Movies",
  "movie/top_rated": "Top Rated Movies",
  "movie/upcoming": "Latest Movies",
};

const MovieList = ({ endpoint = "movie/popular", sortCriteria = "popularity" }) => {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, endpoint]);

  const fetchMovies = (page) => {
    fetch(
      `https://api.themoviedb.org/3/${endpoint}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          const sortedMovies = data.results.sort((a, b) => {
            if (sortCriteria === "popularity") return b.popularity - a.popularity;
            if (sortCriteria === "vote_average") return b.vote_average - a.vote_average;
            if (sortCriteria === "release_date") return new Date(b.release_date) - new Date(a.release_date);
            return 0;
          });
          setMovieList(sortedMovies);
          setTotalPages(data.total_pages);
        } else {
          console.error("No results found in API response:", data);
          setMovieList([]);
        }
      })
      .catch((error) => console.error("Error fetching movies:", error));
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">
        {endpointToHeading[endpoint] || "Movies"}
      </h2>

      <div className="list__cards">
        {movieList.length > 0 ? (
          movieList.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <div>
            <p className="noResults">No movies found.</p>
            <p className="warn">If you are on a network provided by Jio, try changing it.</p>
          </div>
        )}
      </div>

      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
