import { Link, useNavigate, useParams } from "react-router";
import { useState } from "react";
import movieData from '../movies.json';
import { useColor } from "../context/colorContext";

function Details() {
    const navigate = useNavigate()
    const { title } = useParams();
    const [movies] = useState(movieData);
    const { darkMode,like, setLike } = useColor();
    const detailedItem = movies.find((item) => item.title.replace(/\?/g, "").trim() === title.trim());

    if (!detailedItem) {
        return <div className="details-container"><h2>Movie not found</h2></div>;
    }

    function handleLike(item){
        setLike([...like,item ])
    }
    
    // Find similar movies
    const similarMovies = movies.filter((item) => {
        if (item.title === detailedItem.title) return false;
        // Similar genres
        const itemGenres = Array.isArray(item.genres) ? item.genres : (item.genres ? item.genres.split("|") : []);
        const detailedGenres = Array.isArray(detailedItem.genres) ? detailedItem.genres : (detailedItem.genres ? detailedItem.genres.split("|") : []);
        const genreMatch = itemGenres.some(g => detailedGenres.includes(g));
        // Similar cast
        const itemCast = Array.isArray(item.stars) ? item.stars : (item.stars ? item.stars.split(",") : []);
        const detailedCast = Array.isArray(detailedItem.stars) ? detailedItem.stars : (detailedItem.stars ? detailedItem.stars.split(",") : []);
        const castMatch = itemCast.some(c => detailedCast.includes(c));
        // Similar timeline (within 5 years)
        const yearMatch = Math.abs((item.release_year || 0) - (detailedItem.release_year || 0)) <= 5;
        return genreMatch || castMatch || yearMatch;
    }).slice(0, 10); // Show up to 10 similar movies

    // Carousel state
    const [carouselIndex, setCarouselIndex] = useState(0);
    const slidesToShow = window.innerWidth < 700 ? 1 : 3;
    const maxIndex = Math.max(0, similarMovies.length - slidesToShow);

    function prevSlide() {
        setCarouselIndex(i => Math.max(0, i - 1));
    }
    function nextSlide() {
        setCarouselIndex(i => Math.min(maxIndex, i + 1));
    }

    return (
        <div className={darkMode ? "darkMode" : "lightMode"}>
            <div className="details-container">
                
                <h1 className="details-title">{detailedItem.title} </h1>
                
                <div className="details-main">
                    <img src={detailedItem.poster} alt={detailedItem.title} className="details-poster" />
                    <div className="details-info">
                        <a className="details-link" href={detailedItem.movie_url} target="_blank" rel="noopener noreferrer">
                            Watch Movie Link
                        </a>
                        
                        <p><strong>Release Year:</strong> {detailedItem.release_year}</p>
                        <p><strong>Rating:</strong> {detailedItem.imdb_rating} ({detailedItem.rating_count} ratings)</p>
                        <p><strong>Length:</strong> {detailedItem.length_in_min} mins</p>
                        <p><strong>Genres:</strong> {Array.isArray(detailedItem.genres) ? detailedItem.genres.join(", ") : detailedItem.genres}</p>
                        <p><strong>Directors:</strong> {detailedItem.directors}</p>
                        <p><strong>Writers:</strong> {detailedItem.writers}</p>
                        <p><strong>Cast:</strong> {detailedItem.stars}</p>
                    </div>
                </div>
                
                <div className="details-plot">
                    <h3>Plot</h3>
                    <p>{detailedItem.plot}</p>
                </div>

                {similarMovies.length > 0 && (
  <div className="similar-carousel-section">
    <h2 className="similar-carousel-title">You might also like</h2>
    <div className="custom-carousel">
      <button
        className="carousel-arrow"
        onClick={prevSlide}
        disabled={carouselIndex === 0}
        aria-label="Previous"
      >
        &#8592;
      </button>
      <div className="carousel-track">
        {similarMovies.slice(carouselIndex, carouselIndex + slidesToShow).map((movie, idx) => (
          <div
            key={idx}
            className="similar-carousel-card"
            onClick={() => navigate(`/${movie.title}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={movie.poster} alt={movie.title} className="similar-carousel-img" />
            <div className="similar-carousel-info">
              <h4>{movie.title}</h4>
              <p>{Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres}</p>
              <p style={{ fontSize: "0.95em", color: "#888" }}>
                {movie.release_year}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-arrow"
        onClick={nextSlide}
        disabled={carouselIndex === maxIndex}
        aria-label="Next"
      >
        &#8594;
      </button>
    </div>
  </div>
)}

            </div>
        </div>
    );
}
export default Details;