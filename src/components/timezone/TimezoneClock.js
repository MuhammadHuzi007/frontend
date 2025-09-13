import { useState, useEffect } from 'react';
import './../../styles/timezone.css';

function TimezoneClock({ city, timezone }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const time = date.toLocaleTimeString('en-US', { timeZone: timezone });
      setCurrentTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="timezone-clock fade-in">
      <h3>{city}</h3>
      <p className="clock">{currentTime}</p>
      <p>{timezone}</p>
    </div>
  );
}

export default TimezoneClock;