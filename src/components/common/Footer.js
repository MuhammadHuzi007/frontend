import { Link } from 'react-router-dom';
import './../../styles/footer.css';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2025 GlobalWeatherHub. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
          <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer" className="footer-link">
            Weather API
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;