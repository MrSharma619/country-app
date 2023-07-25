import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../../slices/modeSlice";

function Navbar() {
  //console.log(props);

  const darkMode = useSelector((state) => state.mode.value);
  const dispatch = useDispatch();

  const switchMode = (e) => {
    e.preventDefault();

    dispatch(changeMode());
  };

  return (
    <ul className={darkMode ? "ul_navbar_dark" : "ul_navbar"}>
      <Link to="/" className="link_navbar1">
        <li className="title_li_navbar">
          <span className={darkMode ? "title_navbar_darkmode" : "title_navbar"}>
            Where in the world?
          </span>
        </li>
      </Link>

      <li className="dark_mode">
        <button
          className={darkMode ? "dark_mode_btn_darkmode" : "dark_mode_btn"}
          onClick={switchMode}
        >
          <div className="d-flex-navbar">
            <div className="p-2 flex-fill">
              <img
                className="img_dark_mode"
                alt="moon"
                src={
                  darkMode ? "images/moon-solid.svg" : "images/moon-regular.svg"
                }
              />
            </div>
            <div className="p-2 flex-fill">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </div>
          </div>
        </button>
      </li>
    </ul>
  );
}

export default Navbar;
