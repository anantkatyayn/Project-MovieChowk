import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <header className="header">
      <div className="headerLeft">
        <Link to="/">
          <img className="header_logo" src="/movieChowkLogo.png" alt="MovieChowk Logo" />
        </Link>
        <nav className="navLinks">
          <Link to="/movie/popular" className="navItem">
            Popular
          </Link>
          <Link to="/movie/top_rated" className="navItem">
            Top Rated
          </Link>
          <Link to="/movie/upcoming" className="navItem">
            Upcoming
          </Link>
        </nav>
      </div>

      <div className="headerRight">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchInput"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
