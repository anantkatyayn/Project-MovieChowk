import React, { useEffect, useState } from "react";
import "./MovieList.css";
import Card from "../Card/Card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = (page) => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
        setTotalPages(data.total_pages);
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
      <h2 className="list__title">All Movies</h2>

      <div className="list__cards">
        {movieList.length > 0 ? (
          movieList.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <p className="noResults">No movies found.</p>
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
