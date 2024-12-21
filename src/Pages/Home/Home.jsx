import React, { useEffect, useState } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import MovieList from "../../Components/MovieList/MovieList";
import Footer from "../../Components/Footer/Footer";

const Home = (searchTerm, selectedGenre) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => {
        setPopularMovies(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="poster">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <Carousel
            showThumbs={false}
            autoPlay={true}
            interval={3000}
            transitionTime={1000}
            infiniteLoop={true}
            showStatus={false}
            stopOnHover={false}
          >
            {popularMovies.map((movie) => (
              <Link key={movie.id} className="poster__link" to={`/movie/${movie.id}`}>
                <div className="posterImage">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.original_title}
                  />
                </div>
                <div className="posterImage__overlay">
                  <h2 className="posterImage__title">{movie.original_title}</h2>
                  <div className="posterImage__runtime">
                    {movie.release_date}
                    <span className="posterImage__rating">
                      {movie.vote_average.toFixed(1)}
                      <FaStar className="posterImage__star" />
                    </span>
                  </div>
                  <p className="posterImage__description">
                    {movie.overview.length > 150
                      ? movie.overview.slice(0, 150) + "..."
                      : movie.overview}
                  </p>
                </div>
              </Link>
            ))}
          </Carousel>
        )}
        <MovieList searchTerm={searchTerm} selectedGenre={selectedGenre}/>
        <Footer/>
      </div>
    </>
  );
};

export default Home;
