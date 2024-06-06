import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function Search() {
  const gifs = useSelector((store) => store.gifs);
  const dispatch = useDispatch();
  let [input, setInput] = useState("");

  const handleInput = (event) => {
    setInput(event.target.value);
    console.log(input);
  };
  const searchGifs = () => {
    dispatch({
      type: "FETCH_GIFS",
      payload: input,
    }),
    setInput('');
  };

const favoriteGif = (gifURL) => {
    dispatch({type: 'ADD_FAVORITE', payload: gifURL})
}

  return (
    <>
      <h1>Search Goes Here!!!!</h1>

      <input
        placeholder="Search Gifs..."
        value={input}
        onChange={handleInput}
      ></input>
      <button onClick={searchGifs}>Search</button>

      <div>
        {gifs.map((gif) => (
          <div>
            <img src={gif.images.original.url} />
            <button onClick={() => {favoriteGif(gif.images.original.url)}}>🧡</button>
          </div>
        ))}
      </div>
    </>
  );
}
