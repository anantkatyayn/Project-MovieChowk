import React, { useEffect, useState } from "react";
import "./Movie.css";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";


const Movie = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      });
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (!currentMovieDetail) {
    return <div className="error">Movie details not found.</div>;
  }

  return (
    <div className="movieDetail">
      <div className="movieDetail__poster">
        <img
          src={`https://image.tmdb.org/t/p/original${currentMovieDetail.poster_path}`}
          alt={currentMovieDetail.original_title}
          className="movieDetail__image"
        />
      </div>

      <div className="movieDetail__info">
        <h2 className="movieDetail__title">{currentMovieDetail.original_title}</h2>
        <p className="movieDetail__tagline">{currentMovieDetail.tagline}</p>

        <div className="movieDetail__rating">
          <span>{currentMovieDetail.vote_average.toFixed(1)}</span>
          <FaStar className="movieDetail__star" />
          <span className="movieDetail__voteCount">
            ({currentMovieDetail.vote_count} votes)
          </span>
        </div>

        <p className="movieDetail__runtime">
          ⏱️ {currentMovieDetail.runtime} minutes
        </p>

        <p className="movieDetail__releaseDate">
          📅 Release Date: {currentMovieDetail.release_date}
        </p>

        <div className="movieDetail__genres">
          {currentMovieDetail.genres.map((genre) => (
            <span key={genre.id} className="movieDetail__genre">
              {genre.name}
            </span>
          ))}
        </div>

        <h3 className="movieDetail__synopsisTitle">Overview</h3>
        <p className="movieDetail__synopsis">{currentMovieDetail.overview}</p>
      </div>
    </div>
  );
};

export default Movie;
