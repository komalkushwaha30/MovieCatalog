import { Link, useNavigate, useParams } from "react-router";
import { useState } from "react";
import movieData from '../movies.json';
import { useColor } from "../context/colorContext";

function Details() {
    const navigate = useNavigate()
    const { title } = useParams();
    const [movies] = useState(movieData);
    const { darkMode, setDarkMode,like, setLike } = useColor();
    const detailedItem = movies.find((item) => item.title.replace(/\?/g, "").trim() === title.trim());

    if (!detailedItem) {
        return <div className="details-container"><h2>Movie not found</h2></div>;
    }

    function handleLike(item){
        setLike([...like,item ])
    }
    
    return (
        <div className={darkMode ? "darkMode" : "lightMode"}>
            <div className="details-container">
                <div className="details-modebtn">
                    <button onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button onClick={()=> navigate('/dashboard') }>Go Back</button>
                    <button onClick={()=>handleLike(detailedItem)}>Like</button>
                </div>
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
            </div>
        </div>
    );
}
export default Details;