import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/accueil.css';

function Accueil() {
  return (
    <div className="accueil-container">
      <Navbar />
      <div className="hero-section">
        <h1>Bienvenue sur TeamTask</h1>
        <p>Gérez vos projets et tâches en équipe efficacement</p>
        <div className="cta-buttons">
          <Link to="/login" className="cta-button primary">Se connecter</Link>
          <Link to="/register" className="cta-button secondary">S'inscrire</Link>
        </div>
      </div>
      <div className="features-section">
        <div className="feature-card">
          <h3>Gestion des tâches</h3>
          <p>Créez, assignez et suivez l'avancement de vos tâches simplement.</p>
        </div>
        <div className="feature-card">
          <h3>Collaboration d'équipe</h3>
          <p>Travaillez efficacement avec vos collègues sur des projets communs.</p>
        </div>
        <div className="feature-card">
          <h3>Suivi en temps réel</h3>
          <p>Visualisez l'état d'avancement de vos projets en un coup d'œil.</p>
        </div>
      </div>
    </div>
  );
}

export default Accueil;