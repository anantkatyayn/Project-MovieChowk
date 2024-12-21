import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import "./SearchResults.css";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
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
    if (genre) {
      fetchGenreName(genre);
    }
  }, [query, genre]);

  const fetchMoviesByQuery = (query) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${encodeURIComponent(
        query
      )}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching search results:", error));
  };

  const fetchMoviesByGenre = (genreId) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&with_genres=${genreId}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies by genre:", error));
  };

  const fetchMoviesByQueryAndGenre = (query, genreId) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&with_genres=${genreId}&query=${encodeURIComponent(
        query
      )}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies by query and genre:", error));
  };

  const fetchGenreName = (genreId) => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        const genreObj = data.genres.find((g) => g.id.toString() === genreId);
        if (genreObj) setGenreName(genreObj.name);
      })
      .catch((error) => console.error("Error fetching genre name:", error));
  };

  return (
    <div className="searchResults">
      <h2 className="searchResults__title">
        {query && genre
          ? `Search Results for "${query}" in "${genreName}"`
          : query
          ? `Search Results for "${query}"`
          : genre
          ? `"${genreName}" Movies`
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
