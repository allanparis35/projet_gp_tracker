import React, { useState } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
            
            <div className="w-full mb-12">
              <div className="bulle-custom mb-6 text-sm">tendances :</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="cadre-gris h-80">exemple</div>)}
              </div>
            </div>

            <div className="w-full">
              <div className="bulle-custom mb-6 text-sm">artistes :</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="cadre-gris h-80">exemple</div>)}
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