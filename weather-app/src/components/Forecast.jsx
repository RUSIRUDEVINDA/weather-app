import React from 'react';
import '../App.css';

const Forecast = ({ data }) => {
  // Group forecast by day and get midday forecast for each day
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = new Date(forecast.dt * 1000).toDateString();
    // Only take one forecast per day (around midday)
    if (!acc[date] || forecast.dt_txt.includes('12:00:00')) {
      acc[date] = forecast;
    }
    return acc;
  }, {});

  // Convert to array and take next 5 days
  const forecasts = Object.values(dailyForecasts).slice(0, 5);

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecasts.map((forecast, index) => {
          const date = new Date(forecast.dt * 1000);
          const day = date.toLocaleDateString('en-US', { weekday: 'short' });
          const icon = forecast.weather[0].icon;

          return (
            <div key={index} className="forecast-day">
              <p className="forecast-day-name">{index === 0 ? 'Today' : day}</p>
              <img 
                src={`https://openweathermap.org/img/wn/${icon}.png`} 
                alt={forecast.weather[0].description}
                className="forecast-icon"
              />
              <div className="forecast-temps">
                <span className="forecast-temp-high">
                  {Math.round(forecast.main.temp_max)}°
                </span>
                <span className="forecast-temp-low">
                  {Math.round(forecast.main.temp_min)}°
                </span>
              </div>
              <p className="forecast-description">
                {forecast.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;