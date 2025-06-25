import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserTie, FaSpinner } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import '../assets/register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [localError, setLocalError] = useState('');
  const [isFocused, setIsFocused] = useState({
    username: false,
    email: false,
    password: false,
    role: false
  });
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

  const handleFocus = (field) => {
    setIsFocused({...isFocused, [field]: true});
  };

  const handleBlur = (field) => {
    setIsFocused({...isFocused, [field]: false});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.username || !formData.email || !formData.password) {
      setLocalError('Please fill in all fields');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setLocalError('Please enter a valid email address');
      return;
    }
    
    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }
    
    dispatch(register(formData));
  };

  return (
    <div className="register-container">
      <Navbar />
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Inscription</h2>
        
        {localError && <div className="error-message">{localError}</div>}
        
        <div className="input-group">
          <span className={`input-icon ${isFocused.username ? 'focused' : ''}`}>
            <FaUser />
          </span>
          <input
            className="input-field"
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
            onFocus={() => handleFocus('username')}
            onBlur={() => handleBlur('username')}
            required
          />
        </div>
        
        <div className="input-group">
          <span className={`input-icon ${isFocused.email ? 'focused' : ''}`}>
            <FaEnvelope />
          </span>
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            required
          />
        </div>
        
        <div className="input-group">
          <span className={`input-icon ${isFocused.password ? 'focused' : ''}`}>
            <FaLock />
          </span>
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
            required
          />
          {formData.password.length > 0 && (
            <div className="password-strength">
              <div 
                className={`strength-bar ${formData.password.length < 6 ? 'weak' : formData.password.length < 10 ? 'medium' : 'strong'}`}
                style={{width: `${Math.min(100, formData.password.length * 10)}%`}}
              ></div>
            </div>
          )}
        </div>
        
        <div className="input-group">
          <span className={`input-icon ${isFocused.role ? 'focused' : ''}`}>
            <FaUserTie />
          </span>
          <select
            className="select-field"
            name="role"
            value={formData.role}
            onChange={handleChange}
            onFocus={() => handleFocus('role')}
            onBlur={() => handleBlur('role')}
          >
            <option value="user">Utilisateur</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        
        <button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <FaSpinner className="spinner" /> Création...
            </>
          ) : (
            "S'inscrire"
          )}
          <span className="button-wave"></span>
        </button>
      </form>
    </div>
  );
}

export default Register;