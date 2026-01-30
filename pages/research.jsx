import React, { useState } from 'react';

const Research = () => {
  // État pour savoir si le volet est ouvert ou fermé
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 relative">
      
      {/* BOUTON POUR OUVRIR LES FILTRES */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="bulle-custom px-6 py-2 border border-[#5b21b6] hover:bg-[#5b21b6]/20 transition-all uppercase tracking-widest text-sm"
        >
          Filtrer les résultats 
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {/* Barre de recherche principale */}
        <input 
          type="text"
          placeholder="Rechercher un artiste, un lieu..."
          className="cadre-gris w-full p-6 bg-transparent border-2 border-dashed border-[#2d2d44] focus:border-[#5b21b6] outline-none text-xl transition-colors"
        />

        {/* Zone de résultats */}
        <div className="cadre-gris min-h-[400px] w-full p-6 italic text-gray-400">
          "Les résultats de recherche s'afficheront ici..."
        </div>
      </div>
      
      {/* Overlay sombre (cliquer ici ferme le volet) */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Le panneau latéral */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#0b0b0f] border-l border-[#2d2d44] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out p-8 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[#c4b5fd] font-bold uppercase tracking-widest">Filtres</h2>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

      </div>
    </div>
  );
}

export default Research;