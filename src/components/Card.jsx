import { Link, useNavigate } from "react-router";
import { useColor } from "../context/colorContext";
import Details from "./Details";

function Card({ title, img, rating, genre,item }) {
  const navigate = useNavigate()
  const { darkMode,like, setLike  } = useColor();
  

  function handleLike(item){
    setLike([...like, item])
  }
  
  return (
    <div className={`card ${darkMode ? "dark-card" : "light-card"}`}>
      <img src={img} alt={title} className="card-img" onError={(e)=>{e.target.onerror = null; e.target.src = "https://demofree.sirv.com/nope-not-here.jpg"} }/>
      <h2 className="card-title">{title}</h2>
      <p className="card-rating">{rating}</p>
      <p className="card-genre">{Array.isArray(genre) ? genre.join(", ") : genre}</p>
      <button onClick={()=>navigate(`/${item.title}`)}  className="">View Details</button>
      <button className=""  onClick={()=>handleLike(item)} >Add to Like List</button>
    </div>
  );
}

export default Card;

