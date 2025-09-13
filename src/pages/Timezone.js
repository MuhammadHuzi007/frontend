import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTimezone, searchCities } from '../services/TimezoneApi';
import { toast } from 'react-toastify';
import TimezoneClock from '../components/timezone/TimezoneClock';
import WorldMap from '../components/timezone/WorldMap';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import '../styles/global.css'; // Fixed path

function Timezone() {
  const { city } = useParams();
  const [timezoneData, setTimezoneData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) {
      setLoading(false);
      return; // Handle /timezones route if needed
    }
    setLoading(true);
    getTimezone(city)
      .then((data) => {
        setTimezoneData(data);
        setError(null);
      })
      .catch((err) => {
        setError('Failed to fetch timezone data');
        toast.error('Error fetching timezone');
      })
      .finally(() => setLoading(false));
  }, [city]);

  return (
    <div className="timezone-page">
      <h1>{city ? `Timezone for ${city}` : 'World Timezones'}</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          {timezoneData && (
            <>
              <TimezoneClock city={city} timezone={timezoneData.timezone} />
              <WorldMap city={city} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Timezone;