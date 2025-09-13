import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppProvider';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Weather from './pages/Weather';
import Timezone from './pages/Timezone';
import Compare from './pages/Compare';
import Favorites from './pages/Favorites';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/weather/:city" element={<Weather />} />
              <Route path="/timezone/:city" element={<Timezone />} />
              <Route path="/timezones" element={<Timezone />} /> {/* Fallback for /timezones without city; adjust Timezone.js to handle optional param */}
              <Route path="/compare" element={<Compare />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;