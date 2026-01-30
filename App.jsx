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
  const [loading, setLoading] = useState(false);

  // useCallback permet de stabiliser la fonction pour l'utiliser dans useEffect
  const fetchArtists = useCallback(async () => {
    const token = localStorage.getItem('token');

    // Si on n'a pas de token, on ne tente même pas l'appel
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("Tentative de récupération des artistes...");
      
      const response = await fetch('http://localhost:8080/artists', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Données reçues du serveur :", data);
        
        // Sécurité : on s'assure que data est bien un tableau
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
      setLoading(false);
    }
  }, []);

  // Chargement des artistes au démarrage ou quand le token change
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchArtists();
    }
  }, [fetchArtists]);

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
          <div className="flex flex-col items-center">
            <div className="bulle-custom text-2xl px-16 py-4 mb-20 font-black uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(91,33,182,0.2)]">
              Évènements
            </div>
            
            {/* TENDANCES (Statique) */}
            <div className="w-full mb-20">
              <h2 className="text-[#c4b5fd] mb-8 italic text-sm uppercase tracking-[0.2em] font-bold border-l-4 border-[#5b21b6] pl-4">
                Tendances
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="cadre-gris aspect-[3/4] group flex items-center justify-center border border-[#2d2d44] hover:border-[#5b21b6] transition-all cursor-pointer">
                    <span className="text-[#f3ebff]/50 group-hover:text-white font-bold uppercase text-xs tracking-widest">
                      Top Tendance {i}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION ARTISTES DYNAMIQUE */}
            <div className="w-full">
              <h2 className="text-[#c4b5fd] mb-8 italic text-sm uppercase tracking-[0.2em] font-bold border-l-4 border-[#5b21b6] pl-4">
                Artistes
              </h2>
              
              {loading ? (
                <div className="flex flex-col items-center py-20 gap-4">
                  <div className="w-12 h-12 border-4 border-[#5b21b6] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[#9f7aea] animate-pulse font-bold uppercase text-xs tracking-[0.2em]">Chargement des artistes...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {artistes.length > 0 ? (
                    artistes.map(artiste => (
                      <div key={artiste.id} className="cadre-gris flex flex-col p-0 overflow-hidden group border border-[#2d2d44] hover:border-[#5b21b6] transition-all duration-300">
                        <div className="aspect-[3/4] overflow-hidden bg-[#0b0b0f]">
                          <img 
                            src={artiste.image || 'https://via.placeholder.com/400x600?text=No+Image'} 
                            alt={artiste.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                          />
                        </div>
                        <div className="p-4 flex items-center justify-center bg-[#13131a] border-t border-[#2d2d44] group-hover:bg-[#1a1a25]">
                          <span className="font-bold uppercase tracking-tighter text-sm text-center group-hover:text-[#c4b5fd] truncate">
                            {artiste.name}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full bg-[#13131a] border border-dashed border-[#2d2d44] rounded-2xl text-center py-20 text-gray-500 italic">
                      Aucun artiste trouvé. Vérifiez la connexion au serveur Go.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
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