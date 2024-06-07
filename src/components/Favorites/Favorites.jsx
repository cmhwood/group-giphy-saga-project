import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "../Favorites/Favorites.css";

export default function FavoriteGifs() {
  const favorites = useSelector((store) => store.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES" });
  }, []);

  const updateCategory = (favID) => {
    const newCategory = Number(event.target.value);
    console.log(event.target.value);
    console.log("category:", category);
    console.log("id:", favID);
    dispatchUpdate(newCategory, favID);
    console.log("checking newCategory", newCategory.name);
  };

  const dispatchUpdate = (category, favID) => {
    dispatch({
      type: "UPDATE_CATEGORY",
      payload: {
        category_id: category,
        gifID: favID,
      },
    });
  };

  const deleteFavorite = (favoriteID) => {
    dispatch({
      type: "DELETE_FAVORITE",
      payload: favoriteID,
    });
    // console.log('clicked:', favoriteID)
  };

  return (
    <>
      <h1>Favorite Gifs</h1>
      <div className="card-wrapper">  
      {favorites.map((favorite) => (
        <div
          key={favorite.id}
          className={"card page-card"}
          style={{ width: "18rem" }}
        >
          <div className={"card-body"}>
            <img src={favorite.url} className={"card-img-top"} />
            <p>
              Category:{" "}
              {favorite.category_id === 1
                ? "Wild"
                : favorite.category_id === 2
                ? "Uproarious"
                : favorite.category_id === 3
                ? "Poignant"
                : favorite.category_id === 4
                ? "Felicitous"
                : favorite.category_id === 5
                ? "Whimsical"
                : "Add Category"}
            </p>
            <button
              onClick={() => {
                deleteFavorite(favorite.id);
              }} 
              className="btn btn-primary"
            >
              Remove
            </button>
            <select
              name="category"
              id="category"
              onChange={(event) => {
                const newCategory = Number(event.target.value);
                updateCategory(favorite.id, newCategory);
              }}
            >
              <option defaultValue>------</option>

              <option value="1">Wild</option>
              <option value="2">Uproarious</option>
              <option value="3">Poignant</option>
              <option value="4">Felicitous</option>
              <option value="5">Whimsical</option>
            </select>
            
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
