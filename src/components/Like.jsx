import { useColor } from "../context/colorContext";
import { useNavigate } from "react-router";


function Like() {
    const navigate = useNavigate()
    const { like, darkMode, setLike } = useColor();
    function handleRemove(title){
        setLike(like.filter((item)=>item.title != title ))
    }

    return (
        <div className={darkMode ? "darkMode" : "lightMode"}>
            <div className="like-container">
                <h1 className="like-title">Liked Movies</h1>
                <div className="like-list">
                    {like.length === 0 ? (
                        <p className="like-empty">No liked movies yet.</p>
                    ) : (
                        like.map((item, idx) => (
                            <div className="like-card" key={idx}>
                                <h5>{item.title}</h5>
                                <img src={item.poster} alt={item.title} className="details-poster" />
                                <p>Rating : {item.imdb_rating}</p>
                                <button onClick={()=>handleRemove(item.title)}>Remove</button>
                                <button onClick={()=>navigate(`/${item.title}`)}>View Details</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}



export default Like;