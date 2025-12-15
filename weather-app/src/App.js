import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric');

  const fetchWeather = async (city = 'London') => {
    try {
      setLoading(true);
      setError('');
      
      // Current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }
      
      const weather = await weatherResponse.json();
      
      // 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      
      const forecast = await forecastResponse.json();
      
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [unit]);

  const handleSearch = (city) => {
    fetchWeather(city);
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌤️ Weather Forecast</h1>
        <button className="unit-toggle" onClick={toggleUnit}>
          Switch to {unit === 'metric' ? '°F' : '°C'}
        </button>
      </header>

      <main className="App-main">
        <SearchBar onSearch={handleSearch} />
        
        {loading && <div className="loading">Loading weather data...</div>}
        
        {error && <div className="error">{error}. Please try another city.</div>}
        
        {weatherData && (
          <>
            <WeatherCard data={weatherData} unit={unit} />
            {forecastData && <Forecast data={forecastData} />}
          </>
        )}
      </main>
    </div>
  );
}

export default App;