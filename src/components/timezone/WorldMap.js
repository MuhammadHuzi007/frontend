import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { searchCities } from '../../services/weatherApi';
import { toast } from 'react-toastify';
import './../../styles/timezone.css';
import 'leaflet/dist/leaflet.css';

function WorldMap({ city }) {
  const [position, setPosition] = useState([0, 0]); // Default: [lat, lon]

  useEffect(() => {
    if (city) {
      searchCities(city)
        .then((data) => {
          const { lat, lon } = data[0] || {};
          if (lat && lon) {
            setPosition([lat, lon]);
          }
        })
        .catch(() => toast.error('Error fetching city coordinates'));
    }
  }, [city]);

  return (
    <div className="world-map fade-in">
      <MapContainer center={position} zoom={10} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {position[0] !== 0 && (
          <Marker position={position}>
            <Popup>{city}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default WorldMap;