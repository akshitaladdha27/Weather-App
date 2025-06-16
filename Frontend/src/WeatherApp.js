import React, { useState } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [bgClass, setBgClass] = useState("clear");

  const API_KEY = "9968c722bcbf425688883842251606";

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError(null);

      const condition = data.current.condition.text.toLowerCase();
      if (condition.includes("rain")) {
        setBgClass("rain");
      } else if (condition.includes("cloud")) {
        setBgClass("cloud");
      } else {
        setBgClass("clear");
      }
    }
    } catch (err) {
    console.error("Error fetching weather:", err);
    setError("Something went wrong");
    setWeather(null);
  }
  };

  return (
    <div className={`weather-container ${bgClass}`}>
      
        <h2>🌤️ Weather App</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault(); 
            getWeather(); 
          }}
          className="input-group"
        >
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Get Weather</button>
        </form>

        {error && <p className="error">{error}</p>}

        {weather && weather.location && (
          <div className="weather-info">
            <h3>
              {weather.location.name}, {weather.location.country}
            </h3>
            <p>🌡 Temperature: {weather.current.temp_c}°C</p>
            <p>💧 Humidity: {weather.current.humidity}%</p>
            <p>🌬 Wind: {weather.current.wind_kph} kph</p>
            <p>🌥 Condition: {weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt="Weather Icon" />
          </div>
        )}
      
    </div>
  );
};

export default WeatherApp;
