import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "../Search/Search.css";

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
    <body>
    <h1>Search Gifs</h1>
      <input className="form-control" style={{width: '20%'}}
        placeholder="Search Gifs..."
        value={input}
        onChange={handleInput}
      ></input>
      <button onClick={searchGifs} className="btn btn-primary" type="button" style={{margin : '5px 20px 20px 20px'}}>Search</button>

      <div className="card-wrapper">
        {gifs.map((gif) => (

          <div className={"card page-card"}
          style={{ width: "18rem" }}>
            <div className={"card-body"}>
            <img src={gif.images.original.url} className={"card-img-top"}/>
            <button onClick={() => {favoriteGif(gif.images.original.url)}} className="btn btn-secondary" style={{ margin: '20px 5px 5px 100px'}} >🧡</button>
            </div>
       
          </div>
        ))}
      </div>
      </body>
    </>
  );
}
