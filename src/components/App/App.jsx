import { HashRouter as Router, Route } from "react-router-dom";
import FavoriteGifs from "../Favorites/Favorites";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Favorites from "../Favorites/Favorites";
import NavBar from "../NavBar/NavBar.jsx";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <NavBar />
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
