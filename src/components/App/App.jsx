import { HashRouter as Router, Route, Link } from "react-router-dom";
import FavoriteGifs from "../Favorites/Favorites";
import Search from "../Search/Search";
import Favorites from "../Favorites/Favorites";

function App() {
  // useEffect(() => {
  //   ();
  // }, []);
  return (
    <>
      <Router>
        <div className="App">
          <header className="App-header">
            <div>
              <h1>Giphy Search!</h1>
            </div>
            {/* <br /> */}
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/favorites">Favorites</Link>
                </li>
              </ul>
            </nav>
          </header>
        </div>
        <div>
          <Route path="/" exact>
            <Search />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
        </div>
      </Router>
    </>
  );
}

export default App;
