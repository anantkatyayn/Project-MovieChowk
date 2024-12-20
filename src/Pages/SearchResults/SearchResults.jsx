import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import "./SearchResults.css";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const genre = searchParams.get("genre");

  useEffect(() => {
    if (genre && query) {
      fetchMoviesByQueryAndGenre(query, genre);
    } else if (genre) {
      fetchMoviesByGenre(genre);
    } else if (query) {
      fetchMoviesByQuery(query);
    }
  }, [query, genre]);

  // Fetch movies by search term
  const fetchMoviesByQuery = (query) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${encodeURIComponent(query)}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching search results:", error));
  };

  // Fetch movies by genre
  const fetchMoviesByGenre = (genreId) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&with_genres=${genreId}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies by genre:", error));
  };

  // Fetch movies by both search term and genre
  const fetchMoviesByQueryAndGenre = (query, genreId) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&with_genres=${genreId}&query=${encodeURIComponent(query)}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies by query and genre:", error));
  };

  return (
    <div className="searchResults">
      <h2 className="searchResults__title">
        {query && genre
          ? `Search Results for "${query}" in Selected Genre`
          : query
          ? `Search Results for "${query}"`
          : genre
          ? `Movies in Selected Genre`
          : `Search Results`}
      </h2>

      <div className="searchResults__cards">
        {movies.length > 0 ? (
          movies.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <p className="noResults">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
