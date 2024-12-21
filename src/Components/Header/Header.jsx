import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error("Error fetching genres:", error));
  };

  const handleSearch = () => {
    if (searchTerm.trim() || selectedGenre) {
      const query = searchTerm.trim() ? `query=${encodeURIComponent(searchTerm)}` : "";
      const genre = selectedGenre ? `genre=${selectedGenre}` : "";
      const queryString = [query, genre].filter(Boolean).join("&");
      
      navigate(`/search?${queryString}`);
      setShowOverlay(false);
      setSearchTerm("");
      setSelectedGenre("");
    }
  };

  return (
    <header className="header">
      <div className="headerLeft">
        <Link to="/">
          <img className="header_logo" src="/movieChowkLogo.png" alt="MovieChowk Logo" />
        </Link>
        <nav className="navLinks">
          <Link to="/movie/popular" className="navItem">Popular</Link>
          <Link to="/movie/top_rated" className="navItem">Top Rated</Link>
          <Link to="/movie/upcoming" className="navItem">Latest</Link>
        </nav>
      </div>

      <div className="headerRight">
        <button className="searchButton" onClick={() => setShowOverlay(true)}>
          <FiSearch />
        </button>
      </div>

      {showOverlay && (
        <div className="searchOverlay">
          <div className="searchOverlay__content">
            <h2>Search Movies</h2>
            <input
              type="text"
              placeholder="Search by movie name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchOverlay__input"
            />

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="searchOverlay__select"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>

            <div className="searchOverlay__buttons">
              <button onClick={handleSearch} className="searchOverlay__searchButton">
                Search
              </button>
              <button onClick={() => setShowOverlay(false)} className="searchOverlay__closeButton">
                <IoClose size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
