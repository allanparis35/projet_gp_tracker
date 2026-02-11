import React, { useState, useEffect, useCallback } from 'react';

const Research = ({ onSelectConcert }) => { 
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  
  // États des filtres et données
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [results, setResults] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  const priceRanges = [
    { id: '0-30', label: 'Moins de 30€', min: 0, max: 30 },
    { id: '30-70', label: '30€ - 70€', min: 30, max: 70 },
    { id: '70-120', label: '70€ - 120€', min: 70, max: 120 },
    { id: '120-999', label: 'Plus de 120€', min: 120, max: 9999 },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      const [concertsRes, artistsRes] = await Promise.all([
        fetch('http://localhost:8080/concerts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch('http://localhost:8080/artists', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
      ]);

      if (!concertsRes.ok) throw new Error('Erreur concerts');
      if (!artistsRes.ok) throw new Error('Erreur artistes');

      const concertsData = await concertsRes.json();
      const artistsData = await artistsRes.json();

      setConcerts(Array.isArray(concertsData) ? concertsData : []);
      setArtists(Array.isArray(artistsData) ? artistsData : []);

      applyFilters(concertsData, artistsData, searchTerm, selectedRanges);
    } catch (error) {
      console.error('Erreur lors de la récupération :', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilters = (concertsSource, artistsSource, q, ranges) => {
    const qLower = (q || '').trim().toLowerCase();
    const artistMap = {};
    const currentArtists = artistsSource || artists;
    currentArtists.forEach(a => { artistMap[a.id] = a.name; });

    let filtered = (concertsSource || concerts).filter(c => {
      const priceEur = (c.price_cents || c.priceCents || 0) / 100;

      if (ranges && ranges.length > 0) {
        const inAny = ranges.some(rid => {
          const range = priceRanges.find(pr => pr.id === rid);
          return range && priceEur >= range.min && priceEur <= range.max;
        });
        if (!inAny) return false;
      }

      if (selectedArtists.length > 0) {
        if (!selectedArtists.includes(String(c.artist_id || c.artistID))) return false;
      }

      if (qLower) {
        const artistName = (artistMap[c.artist_id] || artistMap[c.artistID] || '').toLowerCase();
        return artistName.includes(qLower);
      }

      return true;
    });

    const enriched = filtered.map(c => ({
      ...c,
      artistName: artistMap[c.artist_id] || artistMap[c.artistID] || 'Inconnu',
      price_eur: (c.price_cents || c.priceCents || 0) / 100,
    }));

    setResults(enriched);
  };

  const toggleRange = (id) => {
    setSelectedRanges(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleArtist = (id) => {
    setSelectedArtists(prev => prev.includes(String(id)) ? prev.filter(x => x !== String(id)) : [...prev, String(id)]);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      if (concerts.length > 0) {
        applyFilters(undefined, undefined, searchTerm, selectedRanges);
      } else {
        fetchData();
      }
    }, 300);
    return () => clearTimeout(t);
  }, [searchTerm, selectedRanges, selectedArtists, fetchData]);

  return (
    <div className="max-w-5xl mx-auto p-6 relative min-h-screen text-white">
      
      {/* BOUTONS DE NAVIGATION SIDEBARS */}
      <div className="flex justify-between mb-6">
        <button onClick={() => setLeftSidebarOpen(true)} className="px-4 py-2 border border-gray-700 text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
          ← Filtrer Artistes
        </button>
        <button onClick={() => setRightSidebarOpen(true)} className="px-4 py-2 border border-[#5b21b6] text-xs uppercase tracking-widest bg-[#5b21b6]/10 hover:bg-[#5b21b6]/20 transition-all">
          Filtrer Prix →
        </button>
      </div>

      {/* RECHERCHE */}
      <div className="space-y-6">
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un artiste..."
          className="w-full p-6 bg-[#0b0b0f] border-2 border-[#2d2d44] focus:border-[#5b21b6] outline-none text-xl transition-all"
        />

        {/* AFFICHAGE DES RÉSULTATS */}
        <div className="min-h-[400px] border border-[#2d2d44] p-6 bg-[#0b0b0f]/50">
          {loading ? (
            <p className="animate-pulse text-[#c4b5fd] text-center uppercase tracking-widest font-bold">Chargement...</p>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {results.map((concert) => (
                <div 
                  key={concert.id} 
                  // CLIC : On appelle la fonction de navigation vers EventDetail
                  onClick={() => onSelectConcert && onSelectConcert(concert.id)}
                  className="group p-6 border border-[#2d2d44] hover:border-[#5b21b6] bg-[#16161e]/40 hover:bg-[#16161e] cursor-pointer transition-all flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-xl group-hover:text-[#c4b5fd] transition-colors">{concert.artistName}</h3>
                    <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">{concert.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#a78bfa] font-black text-2xl">{concert.price_eur.toFixed(2)}€</p>
                    <p className="text-[10px] text-gray-500 uppercase">Réserver →</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="italic text-gray-500 text-center py-20 uppercase tracking-widest">Aucun concert ne correspond à vos critères.</p>
          )}
        </div>
      </div>

      {/* PANNEAU GAUCHE (ARTISTES) */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-[#0b0b0f] border-r border-[#2d2d44] z-[70] transition-transform duration-300 ${leftSidebarOpen ? 'translate-x-0' : "-translate-x-full"} p-6 shadow-2xl`}>
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-[#c4b5fd] font-bold uppercase text-xs tracking-widest">Artistes</h2>
            <button onClick={() => setLeftSidebarOpen(false)} className="text-gray-500 hover:text-white">✕</button>
        </div>
        <div className="space-y-2 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
          {artists.map(a => (
            <label key={a.id} className="flex items-center gap-3 p-3 border border-[#2d2d44] cursor-pointer hover:bg-[#5b21b6]/10 transition-colors">
              <input
                type="checkbox"
                className="accent-[#5b21b6] w-4 h-4"
                checked={selectedArtists.includes(String(a.id))}
                onChange={() => toggleArtist(a.id)}
              />
              <span className="text-sm uppercase font-medium">{a.name}</span>
            </label>
          ))}
        </div>
        <button onClick={() => setLeftSidebarOpen(false)} className="w-full py-4 bg-[#5b21b6] font-bold uppercase text-xs mt-6 tracking-widest">Valider</button>
      </div>

      {/* PANNEAU DROIT (FILTRES PRIX) */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#0b0b0f] border-l border-[#2d2d44] z-[70] transition-transform duration-300 ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} p-8 shadow-2xl`}>
        <div className="flex justify-between items-center mb-10">
            <h2 className="text-[#c4b5fd] font-bold uppercase text-xs tracking-widest">Prix</h2>
            <button onClick={() => setRightSidebarOpen(false)} className="text-gray-500 hover:text-white">✕</button>
        </div>
        <div className="space-y-4">
          {priceRanges.map((range) => (
            <label key={range.id} className="flex items-center gap-3 p-4 border border-[#2d2d44] cursor-pointer hover:bg-[#5b21b6]/10 transition-colors">
              <input 
                type="checkbox" 
                className="accent-[#5b21b6] w-5 h-5"
                checked={selectedRanges.includes(range.id)}
                onChange={() => toggleRange(range.id)}
              />
              <span className="text-sm font-medium uppercase">{range.label}</span>
            </label>
          ))}
        </div>
        <button onClick={() => setRightSidebarOpen(false)} className="w-full py-4 bg-[#5b21b6] mt-8 font-bold uppercase text-xs tracking-widest">Filtrer</button>
      </div>

      {/* OVERLAY */}
      {(leftSidebarOpen || rightSidebarOpen) && (
        <div className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm" onClick={() => { setLeftSidebarOpen(false); setRightSidebarOpen(false); }} />
      )}
    </div>
  );
}

export default Research;