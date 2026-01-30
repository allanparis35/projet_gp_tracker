import React, { useState, useEffect, useCallback } from 'react';

const Research = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  
  // États des filtres et données
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const priceRanges = [
    { id: '0-30', label: 'Moins de 30€' },
    { id: '30-70', label: '30€ - 70€' },
    { id: '70-120', label: '70€ - 120€' },
    { id: '120-999', label: 'Plus de 120€' },
  ];

  // --- MÉTHODE FETCH ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Construction de l'URL avec les paramètres
      const params = new URLSearchParams({
        query: searchTerm,
        // On envoie les tranches sous forme de liste séparée par des virgules
        price_ranges: selectedRanges.join(','), 
      });

      const response = await fetch(`https://ton-api-backend.com/api/concerts?)${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // Si tu as une auth
        }
      });

      const data = await response.json();
      setResults(data); // On stocke les résultats du repo backend
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedRanges]);

  // Déclencher la recherche quand on clique sur "Confirmer" ou qu'on tape
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 500); // Délai pour éviter de harceler le serveur à chaque lettre tapée

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, fetchData]);

  const toggleRange = (id) => {
    setSelectedRanges(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

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
                  <h3 className="font-bold">{concert.artist}</h3>
                  <p className="text-sm text-gray-400">{concert.venue} - {concert.price}€</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="italic text-gray-500 text-center">Aucun résultat trouvé.</p>
          )}
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