import React, { useEffect, useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { FaStar } from "react-icons/fa";

const Card = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="card">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <div className="skeleton-placeholder" />
          </SkeletonTheme>
        </div>
      ) : (
        <Link to={`/movie/${movie.id}`} className="card-link">
          <div className="card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              className="card__image"
            />
            <div className="card__overlay">
              <h3 className="card__title">{movie.original_title}</h3>
              <div className="card__details">
                <span className="card__runtime">{movie.release_date}</span>
                <span className="card__rating">
                  <FaStar className="card__star" />
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>
              </div>
              <p className="card__description">
                {movie.overview.length > 120
                  ? movie.overview.slice(0, 120) + "..."
                  : movie.overview}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Card;
