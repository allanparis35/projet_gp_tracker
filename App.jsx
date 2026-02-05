import React, { useState, useEffect, useCallback } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/register';
import Account from './pages/account';
import Research from './pages/research';

function App() {
  // On initialise la page en fonction de la présence du token
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('token') ? 'home' : 'account');
  const [artistes, setArtistes] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [loadingArtists, setLoadingArtists] = useState(false);
  const [loadingConcerts, setLoadingConcerts] = useState(false);

  // useCallback permet de stabiliser la fonction pour l'utiliser dans useEffect
  const fetchArtists = useCallback(async () => {
    try {
      setLoadingArtists(true);
      console.log("Tentative de récupération des artistes...");

      const response = await fetch('http://localhost:8080/artists', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Données reçues du serveur :", data);
        setArtistes(Array.isArray(data) ? data : []);
      } else {
        console.error("Erreur serveur code :", response.status);
        if (response.status === 401) {
          handleLogout();
        }
      }
    } catch (error) {
      console.error("Erreur réseau (le backend est-il lancé sur 8080 ?) :", error);
    } finally {
      setLoadingArtists(false);
    }
  }, []);

  const fetchConcerts = useCallback(async () => {
    try {
      setLoadingConcerts(true);
      console.log('Récupération des concerts...');
      const response = await fetch('http://localhost:8080/concerts', { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        setConcerts(Array.isArray(data) ? data : []);
      } else {
        console.error('Erreur lors de la récupération des concerts', response.status);
      }
    } catch (err) {
      console.error('Erreur réseau concerts :', err);
    } finally {
      setLoadingConcerts(false);
    }
  }, []);

  // Chargement des artistes et concerts au démarrage
  useEffect(() => {
    fetchArtists();
    fetchConcerts();
  }, [fetchArtists, fetchConcerts]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setArtistes([]);
    setCurrentPage('account');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('home');
    fetchArtists(); // On recharge immédiatement après la connexion
  };

  return (
    <div className="min-h-screen bg-[#08070a] text-white font-sans selection:bg-[#5b21b6] selection:text-white">
      
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 flex items-center gap-4 p-5 bg-[#08070a]/90 border-b border-[#2d2d44] backdrop-blur-md">
        <div className="flex gap-4">
          <button 
            onClick={() => setCurrentPage('home')} 
            className={`px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all ${currentPage === 'home' ? 'text-[#c4b5fd] border-b-2 border-[#5b21b6]' : 'text-gray-400 hover:text-white'}`}
          >
            Accueil
          </button>
          <button 
            onClick={() => setCurrentPage('research')} 
            className={`px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all ${currentPage === 'research' ? 'text-[#c4b5fd] border-b-2 border-[#5b21b6]' : 'text-gray-400 hover:text-white'}`}
          >
            Recherche
          </button>
          <button 
            onClick={() => setCurrentPage('profile')} 
            className={`px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all ${currentPage === 'profile' ? 'text-[#c4b5fd] border-b-2 border-[#5b21b6]' : 'text-gray-400 hover:text-white'}`}
          >
            Profil
          </button>
        </div>
        
        <div className="ml-auto flex gap-4 items-center">
          {localStorage.getItem('token') && (
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-[10px] font-black uppercase tracking-tighter text-red-500 border border-red-500/20 hover:bg-red-500/10 transition-all rounded"
            >
              Déconnexion
            </button>
          )}
          <button 
            onClick={() => setCurrentPage('account')} 
            className={`bulle-custom px-6 py-2 text-sm font-bold uppercase tracking-widest transition-all ${currentPage === 'account' ? 'ring-2 ring-[#5b21b6] scale-105' : 'opacity-80 hover:opacity-100'}`}
          >
            Compte
          </button>
        </div>
      </nav>

      {/* CONTENU PRINCIPAL */}
      <main className="container mx-auto py-12 px-6">
        
        {/* PAGE ACCUEIL */}
        {currentPage === 'home' && (
          <Home
            artistes={artistes}
            concerts={concerts}
            loadingArtists={loadingArtists}
            loadingConcerts={loadingConcerts}
          />
        )}

        {/* ROUTAGE DES AUTRES PAGES */}
        {currentPage === 'research' && <Research />}
        {currentPage === 'profile'  && <Profile />}
        
        {currentPage === 'account' && (
          <Account
            onLoginSuccess={handleLoginSuccess}
            onShowRegister={() => setCurrentPage('register')}
          />
        )}

        {currentPage === 'register' && (
          <Register
            onRegisterSuccess={() => setCurrentPage('account')}
            onShowAccount={() => setCurrentPage('account')}
          />
        )}
      </main>

      <footer className="mt-20 py-10 border-t border-[#2d2d44] text-center text-gray-600 text-[10px] uppercase tracking-[0.5em]">
        Groupie Tracker Project — 2026
      </footer>
    </div>
  );
}

export default App;