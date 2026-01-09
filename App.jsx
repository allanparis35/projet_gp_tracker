import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  // 1. Créer un état pour stocker les artistes
  const [artistes, setArtistes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Récupérer les données du back-end au chargement
  useEffect(() => {
    if (currentPage === 'home') {
      // Remplace l'URL par celle de ton API Go (ex: http://localhost:8080/api/artists)
      fetch('http://localhost:5432/api/artists')
        .then(response => response.json())
        .then(data => {
          setArtistes(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Erreur lors de la récupération :", err);
          setLoading(false);
        });
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen">
      <nav className="main-nav">
        <button onClick={() => setCurrentPage('home')} className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}>Accueil</button>
        <button onClick={() => setCurrentPage('explore')} className={`nav-button ${currentPage === 'explore' ? 'active' : ''}`}>Explorer</button>
        <button onClick={() => setCurrentPage('profile')} className={`nav-button ${currentPage === 'profile' ? 'active' : ''}`}>Profil</button>
      </nav>

      <div className="container mx-auto py-8">
        {currentPage === 'home' && (
          <div className="flex flex-col items-center px-6">
            <div className="bulle-custom text-xl px-12 py-3 mb-16">EVENEMENT</div>
            
            {/* Section Tendances (statique pour l'instant) */}
            <div className="w-full mb-12">
              <div className="bulle-custom mb-6 text-sm">tendances :</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="cadre-gris h-80">exemple</div>)}
              </div>
            </div>

            {/* 3. Section Artistes (Dynamique) */}
            <div className="w-full">
              <div className="bulle-custom mb-6 text-sm">artistes :</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {loading ? (
                  <p>Chargement des artistes...</p>
                ) : (
                  artistes.map(artiste => (
                    <div key={artiste.id} className="cadre-gris h-80 flex flex-col gap-4">
                      {/* Affichage de l'image de l'artiste si elle existe */}
                      <img src={artiste.image} alt={artiste.name} className="w-full h-40 object-cover rounded-lg" />
                      <span className="font-bold">{artiste.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'profile' && <Profile />}
      </div>
    </div>
  );
}

export default App;