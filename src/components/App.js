
import React, { useState } from "react";

const API_KEY = "3118a99d5dd64793d27233cdb63fc94b";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const searchWeather = (e) => {
    if (e.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          setQuery("");
        })
        .catch((err) => console.error(err));
    }
  };

  const kelvinToCelsius = (k) => Math.round(k - 273.15);

  return (
    <div className="app">
      {/* Search input */}
      <input
        type="text"
        className="search"
        placeholder="Enter a city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={searchWeather}
      />

      {/* Weather details */}
      {weather && weather.main && (
        <div className="weather">
          <div className="city">{weather.name}</div>
          <div className="temperature">
            {kelvinToCelsius(weather.main.temp)}°C
          </div>
          <div className="description">
            {weather.weather[0].description}
          </div>
          <img
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
}

export default App;
