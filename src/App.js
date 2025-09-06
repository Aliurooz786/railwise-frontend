import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/HomePage';
import SearchTrainPage from './pages/train/SearchTrainPage';
import BookingPage from './pages/booking/BookingPage';  // ✅ path correct hona chahiye




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchTrainPage />} />
        <Route path="/book/:trainNumber" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;