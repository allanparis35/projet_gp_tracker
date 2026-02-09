import React, { useState, useEffect, useCallback } from 'react';

const Research = () => {
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

  // Récupère concerts et artistes puis applique filtres côté client
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

      if (!concertsRes.ok) throw new Error('Erreur récupération concerts: ' + concertsRes.status);
      if (!artistsRes.ok) throw new Error('Erreur récupération artistes: ' + artistsRes.status);

      const concertsData = await concertsRes.json();
      const artistsData = await artistsRes.json();

      setConcerts(Array.isArray(concertsData) ? concertsData : []);
      setArtists(Array.isArray(artistsData) ? artistsData : []);

      // Appliquer filtres après avoir récupéré les données
      applyFilters(concertsData, artistsData, searchTerm, selectedRanges);
    } catch (error) {
      console.error('Erreur lors de la récupération :', error);
      setConcerts([]);
      setArtists([]);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Applique les filtres en mémoire
  const applyFilters = (concertsSource, artistsSource, q, ranges) => {
    const qLower = (q || '').trim().toLowerCase();

    // Map artist id -> name
    const artistMap = {};
    (artistsSource || artists).forEach(a => { artistMap[a.id] = a.name; });

    let filtered = (concertsSource || concerts).filter(c => {
      // prix en euros
      const priceEur = (c.price_cents !== undefined ? c.price_cents : c.priceCents || 0) / 100;

      // filtre par plage de prix si au moins une sélection
      if (ranges && ranges.length > 0) {
        const inAny = ranges.some(rid => {
          const range = priceRanges.find(pr => pr.id === rid);
          if (!range) return false;
          return priceEur >= range.min && priceEur <= range.max;
        });
        if (!inAny) return false;
      }

      // filtre par artiste sélectionné
      if (selectedArtists && selectedArtists.length > 0) {
        if (!selectedArtists.includes(String(c.artist_id))) return false;
      }

      // filtre par recherche sur le nom de l'artiste
      if (qLower) {
        const artistName = (artistMap[c.artist_id] || artistMap[c.artistID] || '').toLowerCase();
        return artistName.includes(qLower);
      }

      return true;
    });

    // enrichir avec nom d'artiste et prix en euros
    const enriched = filtered.map(c => ({
      ...c,
      artistName: artistMap[c.artist_id] || artistMap[c.artistID] || 'Inconnu',
      price_eur: (c.price_cents !== undefined ? c.price_cents : c.priceCents || 0) / 100,
    }));

    setResults(enriched);
  };

  const toggleRange = (id) => {
    setSelectedRanges(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleArtist = (id) => {
    setSelectedArtists(prev => (
      prev.includes(String(id)) ? prev.filter(x => x !== String(id)) : [...prev, String(id)]
    ));
  };

  // Réapplique les filtres à la frappe / quand on enlève le texte (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      if (concerts.length > 0 || artists.length > 0) {
        applyFilters(undefined, undefined, searchTerm, selectedRanges);
      } else {
        fetchData();
      }
    }, 300);

    return () => clearTimeout(t);
  }, [searchTerm, selectedRanges, selectedArtists, concerts.length, artists.length, fetchData]);

  return (
    <div className="max-w-5xl mx-auto p-6 relative min-h-screen text-white">
      
      {/* BOUTONS DE NAVIGATION */}
      <div className="flex justify-between mb-6">
        <button onClick={() => setLeftSidebarOpen(true)} className="px-4 py-2 border border-gray-700 text-xs uppercase tracking-widest">
          ← Artistes
        </button>
        <button onClick={() => setRightSidebarOpen(true)} className="px-4 py-2 border border-[#5b21b6] text-xs uppercase tracking-widest bg-[#5b21b6]/10">
          Billetterie →
        </button>
      </div>

      {/* RECHERCHE */}
      <div className="space-y-6">
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un artiste..."
          className="w-full p-6 bg-[#0b0b0f] border-2 border-[#2d2d44] focus:border-[#5b21b6] outline-none text-xl"
        />

        {/* AFFICHAGE DES RÉSULTATS */}
        <div className="min-h-[400px] border border-[#2d2d44] p-6">
          {loading ? (
            <p className="animate-pulse text-[#5b21b6]">Chargement des concerts...</p>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {results.map((concert) => (
                <div key={concert.id} className="p-4 border border-[#2d2d44] hover:bg-[#16161e]">
                  <h3 className="font-bold">{concert.artistName}</h3>
                  <p className="text-sm text-gray-400">{concert.location} - {concert.price_eur?.toFixed?.(2) ?? concert.price_eur}€</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="italic text-gray-500 text-center">Aucun résultat trouvé.</p>
          )}
        </div>
      </div>

      {/* PANNEAU GAUCHE (ARTISTES) */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-[#0b0b0f] border-r border-[#2d2d44] z-[70] transition-transform ${leftSidebarOpen ? 'translate-x-0' : "-translate-x-full"} p-6`}>
        <h2 className="text-[#c4b5fd] font-bold mb-6 uppercase text-sm tracking-tighter">Artistes</h2>
        <div className="space-y-3 overflow-y-auto max-h-[75vh] pr-2">
          {artists.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucun artiste chargé.</p>
          ) : (
            artists.map(a => (
              <label key={a.id} className="flex items-center gap-3 p-3 border border-[#2d2d44] cursor-pointer hover:bg-[#5b21b6]/5">
                <input
                  type="checkbox"
                  className="accent-[#5b21b6] w-4 h-4"
                  checked={selectedArtists.includes(String(a.id))}
                  onChange={() => toggleArtist(a.id)}
                />
                <span className="text-sm">{a.name}</span>
              </label>
            ))
          )}
        </div>
        <div className="mt-6">
          <button onClick={() => { applyFilters(undefined, undefined, searchTerm, selectedRanges); setLeftSidebarOpen(false); }} className="w-full py-3 bg-[#5b21b6] font-bold uppercase text-xs">Appliquer</button>
        </div>
      </div>

      {/* PANNEAU DROIT (FILTRES PRIX) */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#0b0b0f] border-l border-[#2d2d44] z-[70] transition-transform ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} p-8`}>
        <h2 className="text-[#c4b5fd] font-bold mb-10 uppercase text-sm tracking-tighter">Filtres Billetterie</h2>
        
        <div className="space-y-4">
          {priceRanges.map((range) => (
            <label key={range.id} className="flex items-center gap-3 p-4 border border-[#2d2d44] cursor-pointer hover:bg-[#5b21b6]/5">
              <input 
                type="checkbox" 
                className="accent-[#5b21b6] w-5 h-5"
                checked={selectedRanges.includes(range.id)}
                onChange={() => toggleRange(range.id)}
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>

        <button 
          onClick={() => { fetchData(); setRightSidebarOpen(false); }}
          className="w-full py-4 bg-[#5b21b6] mt-8 font-bold uppercase text-xs"
        >
          Appliquer les filtres
        </button>
      </div>

      {/* OVERLAY */}
      {(leftSidebarOpen || rightSidebarOpen) && (
        <div className="fixed inset-0 bg-black/60 z-[60]" onClick={() => { setLeftSidebarOpen(false); setRightSidebarOpen(false); }} />
      )}
    </div>
  );
}

export default Research;