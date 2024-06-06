import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { useState } from "react";

export default function FavoriteGifs() {

    const favorites = useSelector((store) => store.favorites);
    const dispatch = useDispatch();

    // console.log(favorites);

    useEffect(() => {
    dispatch({type: 'FETCH_FAVORITES'})
    }, [])

    let [category, setCategory] = useState({
        name: ''
    })

    const updateCategory = (event) => {
        if (event.target.value === 'wild') {
            setCategory({name: event.target.value})
        }
        // dispatch({ type: 'UPDATE_CATEGORY', payload: gifId });
        return category;
    }

    const deleteFavorite = (favoriteID) => {
        dispatch({
            type: "DELETE_FAVORITE",
            payload: favoriteID
        })
        // console.log('clicked:', favoriteID)
    }

    return (
        <>
        <h1>Favorite Gifs</h1>
        {favorites.map(favorite => (
            <div key={favorite.id} className='fav-gif'>
                <img src={favorite.url} />
                <button onClick={() => {deleteFavorite(favorite.id)}}>Remove</button>
                <select name="category" id="category">
                <option defaultValue>-------</option>
                <option onChange={updateCategory} value="wild">Wild</option>
                <option value="uproarious">Uproarious</option>
                <option value="poignant">Poignant</option>
                <option value="felicitous">Felicitous</option>
                <option value="whimsical">Whimsical</option>
                </select>
                    </div>
                    
        ))}
        </>
    )
}