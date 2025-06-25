import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import Accueil from './pages/Accueil';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      
      <Routes>
      <Route path="/" element={<Accueil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/home" element={<Accueil />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } /> 
        <Route path="/admin" element={
  <ProtectedRoute role="manager">
    <AdminPage />
  </ProtectedRoute>
} />
      </Routes>
    </Router>
  );
}

export default App;
