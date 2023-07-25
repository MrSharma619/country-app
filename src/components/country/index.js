import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Country() {
  const [countryDetails, setCountryDetails] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  const darkMode = useSelector((state) => state.mode.value);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const fetchBorderCountries = async (neighboringCountryCodes) => {
    if (!neighboringCountryCodes) {
      return [];
    }

    const borderPromises = neighboringCountryCodes.map(async (countryCode) => {
      try {
        const response = await fetch(
          `https://restcountries.com/v2/alpha/${countryCode}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        alert(error.message);
        return null;
      }
    });

    return Promise.all(borderPromises);
  };

  useEffect(() => {
    const countryCommonName = searchParams.get("country");

    const fetchCountryDetails = async (countryCommonName) => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryCommonName}?fullText=true`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setCountryDetails(data[0]);
      } catch (error) {
        alert(error.message);
        navigate("/");
      }
    };

    fetchCountryDetails(countryCommonName);
  }, [searchParams, navigate]);

  // Fetch border countries when countryDetails and its borders are available
  useEffect(() => {
    if (countryDetails?.borders) {
      fetchBorderCountries(countryDetails.borders)
        .then((borderData) => {
          // Remove any null values in case of error in API calls
          const filteredBorderData = borderData.filter(Boolean);
          setBorderCountries(filteredBorderData);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [countryDetails?.borders]);

  //console.log(borderCountries);

  return (
    <>
      <div className={darkMode ? "body_div_darkmode" : "body_div"}>
        <div className="div_back_btn">
          <Link className="link_to_home" to="/">
            <button className={darkMode ? "btn_back_darkmode" : "btn_back"}>
              <div className="d-flex-back-btn">
                <div className="p-2 flex-fill">
                  <img
                    alt="left-arrow"
                    src={
                      darkMode
                        ? "images/arrow-left-long-light.svg"
                        : "images/arrow-left-long-solid.svg"
                    }
                    className="img_left_arrow"
                  />
                </div>
                <div className="p-2 flex-fill">Back&emsp;</div>
              </div>
            </button>
          </Link>
        </div>
        {countryDetails && (
          <div className={darkMode ? "country_info_darkmode" : "country_info"}>
            <div className="d-flex-cinfo">
              <div className="p-2 flex-fill">
                <img
                  alt={countryDetails?.flags.alt}
                  src={countryDetails?.flags.png}
                  className="country_flag_png"
                />
              </div>
              <div className="p-2 flex-fill detail_div">
                <span className="country_name">
                  {countryDetails?.name.common}
                </span>

                <br></br>
                <br></br>

                <div className="d-flex-detail_line">
                  <div className="p-2 flex-fill">
                    <span className="detail_point">Native Name: </span>
                    {Object.values(countryDetails?.name.nativeName)[0].common}
                  </div>
                  <div className="p-2 flex-fill">
                    <span className="detail_point">Top Level Domain: </span>
                    {countryDetails?.tld[0]}
                  </div>
                </div>

                <br></br>

                <div className="d-flex-detail_line">
                  <div className="p-2 flex-fill">
                    <span className="detail_point">Population: </span>
                    {countryDetails?.population.toLocaleString()}
                  </div>
                  <div className="p-2 flex-fill">
                    <span className="detail_point">Currencies: </span>
                    {Object.values(countryDetails?.currencies)[0].name}
                  </div>
                </div>

                <br></br>

                <div className="d-flex-detail_line">
                  <div className="p-2 flex-fill">
                    <span className="detail_point">Region: </span>
                    {countryDetails?.region}
                  </div>
                  <div className="p-2 flex-fill">
                    <span className="detail_point">Languages: </span>
                    {Object.keys(countryDetails?.languages || {})
                      .map(function (k) {
                        return countryDetails?.languages[k];
                      })
                      .join(", ")}
                  </div>
                </div>

                <br></br>

                <div>
                  <span className="detail_point">Sub Region: </span>
                  {countryDetails?.subregion}
                </div>

                <br></br>

                <div>
                  <span className="detail_point">Capital: </span>
                  {countryDetails?.capital[0]}
                </div>

                <br></br>
                <br></br>

                <div>
                  <span className="detail_point">Border Countries: </span>
                  {borderCountries.map((x, i) => (
                    <Link
                      key={i}
                      className="link_to_home"
                      to={{
                        pathname: "/detail",
                        search: `?country=${x.name}`,
                      }}
                    >
                      <button
                        className={
                          darkMode
                            ? "btn_border_country_darkmode"
                            : "btn_border_country"
                        }
                      >
                        {x.name}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Country;
