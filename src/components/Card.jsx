import { useNavigate } from "react-router";
import { useColor } from "../context/colorContext";


function Card({ title, img, rating, genre,item }) {
  const navigate = useNavigate()
  const { darkMode,like, setLike } = useColor();

  // checking if the item is liked or not 
  const isLiked = like.some((movie)=>movie.title === item.title)
  const buttonName = isLiked ? "Remove" : "Add"

  
  // this is to handle the like and unlike functionality 
  function handleLike(item){

    if(!isLiked){
      setLike([...like, item])

    }else{
      setLike(like.filter((movie)=>movie.title !== item.title))
    }
  }

 

  return (
    <div className={`card ${darkMode ? "dark-card" : "light-card"}`}>
      <img src={img} alt={title} className="card-img" onError={(e)=>{e.target.onerror = null; e.target.src = "https://demofree.sirv.com/nope-not-here.jpg"} }/>
      <h2 className="card-title">{title}</h2>
      <p className="card-rating">{rating}</p>
      <p className="card-genre">{Array.isArray(genre) ? genre.join(", ") : genre}</p>
      <button onClick={()=>navigate(`/${item.title}`)}  className="">View Details</button>
      <button className=""  onClick={()=>handleLike(item)} >{buttonName}</button>
    </div>
  );
}

export default Card;

