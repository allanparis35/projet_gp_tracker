import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/register';
import Account from './pages/account';
import Research from './pages/research';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [artistes, setArtistes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      // 1. On s'assure que le mode chargement est actif au début
      setLoading(true);
      
      // 2. Récupérer le token stocké
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("Aucun token trouvé, l'utilisateur n'est probablement pas connecté");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/artists', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Envoyer le token au backend pour l'authentification JWT
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          // On met à jour la liste des artistes avec les données du backend
          setArtistes(data || []); 
        } else {
          console.error("Erreur lors de la récupération :", response.status);
        }
      } catch (error) {
        console.error("Erreur réseau (le backend est-il lancé ?) :", error);
      } finally {
        // 3. Quoi qu'il arrive (succès ou erreur), on arrête le chargement
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="min-h-screen bg-[#08070a] text-white">
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 flex items-center gap-4 p-5 bg-[#08070a]/95 border-b border-[#2d2d44] backdrop-blur-lg">
        <div className="flex gap-4">
          <button onClick={() => setCurrentPage('home')} className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}>Accueil</button>
          <button onClick={() => setCurrentPage('research')} className={`nav-button ${currentPage === 'research' ? 'active' : ''}`}>Recherche</button>
          <button onClick={() => setCurrentPage('profile')} className={`nav-button ${currentPage === 'profile' ? 'active' : ''}`}>Profil</button>
        </div>
        
        <div className="ml-auto flex gap-6 items-center">
          <button onClick={() => setCurrentPage('account')} className={`bulle-custom px-6 py-2 text-sm font-bold uppercase tracking-widest ${currentPage === 'account' ? 'opacity-100' : 'opacity-90'}`}>Compte</button>
        </div>
      </nav>

      {/* CONTENU PRINCIPAL */}
      <main className="container mx-auto py-12 px-6">
        
        {currentPage === 'home' && (
          <div className="flex flex-col items-center">
            {/* Grand Titre */}
            <div className="bulle-custom text-2xl px-16 py-4 mb-20 font-black uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(91,33,182,0.3)]">
              Évènement
            </div>
            
            {/* TENDANCES (Exemple statique) */}
            <div className="w-full mb-20">
              <h2 className="text-[#c4b5fd] mb-8 italic text-sm uppercase tracking-[0.2em] font-bold border-l-4 border-[#5b21b6] pl-4">
                Tendances
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="cadre-gris aspect-video md:aspect-[3/4] group">
                    <span className="text-[#f3ebff] group-hover:text-white font-bold uppercase tracking-tighter transition-colors">
                      Top Tendance {i}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION ARTISTES (Dynamique via le Backend) */}
            <div className="w-full">
              <h2 className="text-[#c4b5fd] mb-8 italic text-sm uppercase tracking-[0.2em] font-bold border-l-4 border-[#5b21b6] pl-4">
                Artistes
              </h2>
              
              {loading ? (
                <div className="col-span-full text-center py-20 text-[#9f7aea] animate-pulse font-bold uppercase tracking-widest">
                  Chargement des artistes...
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                  {artistes.length > 0 ? (
                    artistes.map(artiste => (
                      <div key={artiste.id} className="cadre-gris aspect-[3/4] flex flex-col p-0 overflow-hidden group border-2">
                        <div className="w-full h-2/3 overflow-hidden bg-[#0b0b0f]">
                          <img 
                            src={artiste.image || 'https://via.placeholder.com/400x600'} 
                            alt={artiste.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                          />
                        </div>
                        <div className="h-1/3 flex items-center justify-center bg-[#13131a] border-t-2 border-[#5b21b6]/30 group-hover:border-[#5b21b6]">
                          <span className="font-bold uppercase tracking-widest text-center px-2 group-hover:text-[#c4b5fd]">
                            {artiste.name}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10 text-gray-500 italic">
                      Aucun artiste trouvé dans la base de données.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {currentPage === 'research' && <Research />}
        {currentPage === 'profile' && <Profile />}
        
        {currentPage === 'account' && (
          <Account
            onLoginSuccess={() => setCurrentPage('home')}
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

      <footer className="mt-20 py-10 border-t border-[#2d2d44] text-center text-gray-400 text-xs uppercase tracking-[0.5em]">
        Groupie Tracker Project
      </footer>
    </div>
  );
}

export default App;