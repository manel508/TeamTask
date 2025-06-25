import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { FaHome, FaTachometerAlt, FaUsersCog, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import '../assets/navbar.css';

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar-container">
      <div className="app-title">
        <span>Team</span>Task
      </div>
      
      <div className="nav-links">
        <Link to="/home" className="nav-link">
          <FaHome className="nav-icon" /> Accueil
        </Link>
        
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">
              <FaTachometerAlt className="nav-icon" /> Dashboard
            </Link>
            
            {user.role === 'manager' && (
              <Link to="/admin" className="nav-link">
                <FaUsersCog className="nav-icon" /> Gestion
              </Link>
            )}
            
            <button className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt className="nav-icon" /> Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              <FaSignInAlt className="nav-icon" /> Connexion
            </Link>
            
            <Link to="/register" className="nav-link">
              <FaUserPlus className="nav-icon" /> Inscription
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;