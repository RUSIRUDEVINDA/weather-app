import React from 'react';
import '../App.css';

const WeatherCard = ({ data, unit }) => {
  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind: { speed },
    sys: { country },
    dt
  } = data;

  const date = new Date(dt * 1000);
  const icon = weather[0].icon;
  const description = weather[0].description;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{name}, {country}</h2>
        <p className="date">{date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <div className="temp-display">
            <span className="temp">{Math.round(temp)}</span>
            <span className="temp-unit">°{unit === 'metric' ? 'C' : 'F'}</span>
          </div>
          <div className="weather-icon">
            <img 
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`} 
              alt={description}
            />
            <p className="weather-description">{description}</p>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">{Math.round(feels_like)}°{unit === 'metric' ? 'C' : 'F'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">
              {speed} {unit === 'metric' ? 'm/s' : 'mph'}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;