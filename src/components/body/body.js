import { useEffect, useState } from "react";
import "./style.css";
import CountryCard from "../countrycard";
import { staticData } from "../data";

function Body() {
  const [country, setCountry] = useState([]);
  const [region, setRegion] = useState("Filter by Region");
  const [countryName, setCountryName] = useState("");
  const [searchString, setSearchString] = useState("");

  const handleFetch = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => {
        setCountry(data);
      })
      .catch((error) => {
        //console.log(error);
        alert(error.message);

        //if api ever fails get static json data
        setCountry(staticData);
      });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFilter = (input_region) => {
    setRegion(input_region);
    setSearchString("");

    fetch("https://restcountries.com/v3.1/region/" + input_region)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => {
        setCountry(data);
      })
      .catch((error) => {
        //console.log(error);
        alert(error.message);
        handleFetch();
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();

    //console.log(countryName);

    setRegion("Filter by Region");

    if (countryName.length === 0) {
      handleFetch();
      return;
    }

    fetch("https://restcountries.com/v3.1/name/" + countryName)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Please check search string again!");
      })
      .then((data) => {
        setCountry(data);
      })
      .catch((error) => {
        //console.log(error);
        alert(error.message);
        handleFetch();
      });

    //setTimeout(() => console.log(country), 3000);
  };

  const handleChange = (e) => {
    setSearchString(e.target.value);
    setCountryName(e.target.value);

    //console.log(countryName);
  };

  return (
    <div className="body_div">
      <div className="d-flex-body-top">
        <div className="p-2 flex-fill">
          <form onSubmit={handleSearch} className="example">
            <button type="submit">
              <img
                className="img_search"
                src="images/magnifying-glass-solid.svg"
                alt="search"
              />
            </button>

            <input
              type="text"
              className="filter_input"
              placeholder="Search for a country..."
              onChange={handleChange}
              name="searchString"
              value={searchString}
            />
          </form>
        </div>
        <div className="p-2 flex-fill dropdown_div">
          <button className="dropbtn">
            <div className="d-flex-dropbtn">
              <div className="p-2 flex-fill">{region}</div>
              <div className="p-2 flex-fill">
                <img
                  alt="caret"
                  src="images/angle-down-solid.svg"
                  className="img_caret"
                />
              </div>
            </div>
          </button>
          <div className="dropdown-content">
            <button onClick={() => handleFilter("Africa")}>Africa</button>
            <button onClick={() => handleFilter("America")}>America</button>
            <button onClick={() => handleFilter("Asia")}>Asia</button>
            <button onClick={() => handleFilter("Europe")}>Europe</button>
            <button onClick={() => handleFilter("Oceania")}>Oceania</button>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>

      {country?.map((c, index) => {
        return <CountryCard key={index} data={c} />;
      })}
    </div>
  );
}

export default Body;
