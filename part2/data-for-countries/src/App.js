import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryCodes = ({ countries, setFilter, setDisplay }) => {
  const num = countries.length;

  return (
    <div>
      {num > 10 ? (
        <p>Please refine your search, {num} countries match current criteria</p>
      ) : num > 1 ? (
        <MultiCountryView
          countryList={countries}
          setFilter={setFilter}
          setDisplay={setDisplay}
        />
      ) : (
        countries.map((country) => (
          <SingleCountryView key={country.alpha2Code} country={country} />
        ))
      )}
    </div>
  );
};


const MultiCountryView = ({ countryList, setFilter, setDisplay }) => {

  return (
    <ul>
      {countryList.map((c) => {
        return (
          <li key={c.alpha2Code}>
            {c.name} {"[+" + c.callingCodes + "]"}{" "}
            <ShowButton
              setDisplay={setDisplay}
              setFilter={setFilter}
              country={c}
            />
          </li>
        );
      })}
    </ul>
  );
};

const SingleCountryView = ({ country }) => {
  return (
    <div>
      <h2>
        {country.name} {"[+" + country.callingCodes + "]"}
      </h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((el) => (
          <li key={el.iso639_1}>{el.name}</li>
        ))}
      </ul>
      <img src={country.flag} height="200px" alt="" />
    </div>
  );
};

const ShowButton = ({ country, setFilter, setDisplay }) => {
  return (
    <button
      type="button"
      value={country.name}
      onClick={() => {
        setFilter(country.name);
        setDisplay([country]);
        return null;
      }}
    >
      show
    </button>
  );
};

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries{" "}
      <input
        onChange={handleFilterChange}
        value={filter}
        placeholder="Afghanistan"
      ></input>
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState([]);
  const [display, setDisplay] = useState([]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    let disp = countries.filter((p) =>
      p.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    // setNarrow(false)
    setDisplay(disp);
  };

  useEffect(() => {
    axios.get("http://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div className="App">
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <CountryCodes
        countries={display}
        setFilter={setFilter}
        setDisplay={setDisplay}
      />
    </div>
  );
}

export default App;
