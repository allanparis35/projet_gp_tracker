import React, { useState } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EventDetail from './pages/EventDetail';

function App() {
  // On définit quelle page afficher par défaut
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Une barre de navigation simple pour tester */}
      <nav className="flex justify-center gap-4 p-4 bg-white shadow-sm border-b">
        <button onClick={() => setCurrentPage('home')} className="px-4 py-2 hover:bg-gray-100 rounded">Accueil</button>
        <button onClick={() => setCurrentPage('explore')} className="px-4 py-2 hover:bg-gray-100 rounded">Explorer</button>
        <button onClick={() => setCurrentPage('profile')} className="px-4 py-2 hover:bg-gray-100 rounded">Profil</button>
      </nav>

      {/* Rendu conditionnel selon l'état */}
      <div className="container mx-auto">
        {currentPage === 'home' && <Home />}
        {currentPage === 'explore' && <Explore />}
        {currentPage === 'profile' && <Profile />}
        {currentPage === 'event' && <EventDetail />}
      </div>
    </div>
  );
}

export default App;