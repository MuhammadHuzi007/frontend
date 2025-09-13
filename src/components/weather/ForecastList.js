import './../../styles/weather.css';

function ForecastList({ forecast }) {
  return (
    <div className="forecast-list fade-in">
      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <img
              src={`/assets/${day.condition.toLowerCase()}.png`}
              alt={day.condition}
              className="forecast-icon"
            />
            <p>{day.temp}°C</p>
            <p>{day.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastList;