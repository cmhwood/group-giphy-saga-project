import { Link } from "react-router-dom/cjs/react-router-dom.min";
import '../NavBar/NavBar.css'

function NavBar() {
  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        <li className="nav-link">
          <Link to="/" >Home</Link>
        </li>
        <li className="nav-link">
          <Link to="/favorites" >Favorites</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
