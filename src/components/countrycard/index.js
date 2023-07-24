import { Link } from "react-router-dom";
import "./style.css";

function CountryCard(props) {
  //console.log(props.data);

  const c = props.data;

  const location = {
    pathname: "/detail",
    search: `?country=${c.name.common}`,
  };

  //console.log(c);

  return (
    <div className="column">
      <Link className="link_country" to={location}>
        <div className="country_card">
          <img src={c.flags.png} alt={c.flags.alt} className="img_flag" />
          <div className="container_country_desc">
            <h4>
              <b className="b_country_name">{c.name.official}</b>
            </h4>
            <br></br>
            <p>
              <b className="b_country_details">Population:</b> {c.population}
            </p>
            <p>
              <b className="b_country_details">Region:</b> {c.region}
            </p>
            <p>
              <b className="b_country_details">Capital:</b> {c.capital}
            </p>
          </div>
        </div>
        <br></br>
        <br></br>
      </Link>
    </div>
  );
}

export default CountryCard;
