import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import "./SearchResults.css";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = (query) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => setSearchResults(data.results))
      .catch((error) => console.error("Error fetching search results:", error));
  };

  const fetchGenres = () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error("Error fetching genres:", error));
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const filteredResults = searchResults.filter((movie) => {
    return selectedGenre === "" || movie.genre_ids.includes(parseInt(selectedGenre));
  });

  return (
    <div className="searchResults">
      <h2 className="searchResults__title">Search Results for "{query}"</h2>

      <div className="searchResults__filters">
        <select value={selectedGenre} onChange={handleGenreChange} className="genreSelect">
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="searchResults__cards">
        {filteredResults.length > 0 ? (
          filteredResults.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <p className="noResults">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
