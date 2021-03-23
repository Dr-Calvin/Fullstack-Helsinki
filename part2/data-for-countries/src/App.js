import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryCodes = ({
  countries,
  setFilter,
  setDisplay,
  api_key,
  setWeather,
  weather,
}) => {
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
          <SingleCountryView
            key={country.alpha2Code}
            country={country}
            setWeather={setWeather}
            api_key={api_key}
            weather={weather}
          />
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

const SingleCountryView = ({ country, setWeather, api_key, weather }) => {
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
      <h2>Weather in {country.capital}</h2>
      {useEffect(() => {
        console.log('hello darkness')
        axios
          .get(
            `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital} & units = m
& language = en`
          )
          .then((response) => {
            setWeather(response.data);
            console.log(response.data)
          });
      }, [])}
      {weather.current !== undefined ? (
        <div>
          <p>Temperature: {weather.current.temperature} Celcius</p>
          <p>
            <img
              src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png"
              alt="Wind"
            />
          </p>
          Wind: {weather.current.wind_speed} mph, Direction:{" "}
          {weather.current.wind_dir}
        </div>
      ) : null}
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
  const [weather, setWeather] = useState([]);
  const api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY;

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    let disp = countries.filter((p) =>
      p.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
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
        setWeather={setWeather}
        api_key={api_key}
        weather={weather}
      />
    </div>
  );
}

export default App;
