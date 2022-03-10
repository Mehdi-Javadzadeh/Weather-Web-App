import React, { useState, useEffect } from "react";
import "../components/style.css";
import WeatherDetails from "./WeatherDetails";

function SearchMain() {
  const [searchTerm, setSearchTerm] = useState("Dezful");
  const [tempInfo, setTempInfo] = useState({});

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=cac8899e409d1e62994f8d26d4c2e2d6`;

      let res = await fetch(url);
      let data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleClick();
  }, []);

  // useEffect
  // Async Function
  // Promises
  // Try and Catach
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search city ..."
            id="search"
            onChange={handleChange}
            value={searchTerm}
          />
          <button className="searchButton" onClick={handleClick}>
            Search
          </button>
        </div>
      </div>
      {/* this is the eather details page */}
      <WeatherDetails {...tempInfo} />
    </>
  );
}

export default SearchMain;
