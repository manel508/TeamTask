import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaSpinner } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import '../assets/login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate('/dashboard');
    if (isError) {
      setLocalError(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (localError) setLocalError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!formData.email || !formData.password) {
      setLocalError('Please fill in all fields');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setLocalError('Please enter a valid email address');
      return;
    }
    
    dispatch(login(formData));
  };

  return (
    <div className="login-container">
      <Navbar />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Connexion</h2>
        
        {localError && <div className="error-message">{localError}</div>}
        
        <div className="input-group">
          <span className="input-icon">
            <FaUser />
          </span>
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="input-group">
          <span className="input-icon">
            <FaLock />
          </span>
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <FaSpinner className="spinner" /> Connexion...
            </>
          ) : (
            "Se connecter"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;