import { Link } from "react-router-dom";
import "./style.css";

function Navbar() {
  return (
    <ul className="ul_navbar">
      <Link to="/" className="link_navbar1">
        <li className="title_li_navbar">
          <span className="title_navbar">Where in the world?</span>
        </li>
      </Link>

      <li className="dark_mode">
        <a className="dark_mode_btn" href="#abc">
          <div className="d-flex-navbar">
            <div className="p-2 flex-fill">
              <img
                className="img_dark_mode"
                alt="moon"
                src="http://localhost:3000/images/moon-regular.svg"
              />
            </div>
            <div className="p-2 flex-fill">Dark Mode</div>
          </div>
        </a>
      </li>
    </ul>
  );
}

export default Navbar;
