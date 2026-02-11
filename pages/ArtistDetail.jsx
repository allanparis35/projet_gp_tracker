import React, { useState, useEffect } from 'react';

const apiBase = 'http://localhost:8080';

function makeFullUrl(path, fallback) {
  if (!path) return fallback;
  // Si le chemin est déjà une URL complète (Wikipedia, etc.), on la renvoie telle quelle
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // Sinon, on ajoute l'adresse du serveur local
  const base = 'http://localhost:8080';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

const ArtistDetail = ({ artistId, onBack }) => {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiBase}/artists/${artistId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setArtist(data);
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    if (artistId) fetchArtistInfo();
  }, [artistId]);

  if (loading) return <div className="text-white p-20 text-center animate-pulse uppercase tracking-widest">Chargement de l'artiste...</div>;
  if (!artist) return <div className="text-white p-20 text-center">Artiste introuvable.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      {/* Bouton Retour */}
      <button 
        onClick={onBack} 
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-[#a78bfa] transition-colors font-bold uppercase text-xs tracking-widest"
      >
        <span className="text-xl">←</span> Retour à la liste
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* CADRE IMAGE */}
        <div className="rounded-xl overflow-hidden border-2 border-[#5b21b6] shadow-2xl bg-[#16162a] aspect-[3/4]">
          <img 
            src={makeFullUrl(artist.image_url, '/images/default-artist.jpg')} 
            alt={artist.name} 
            className="w-full h-full object-cover"
            />
        </div>
        
        {/* INFOS */}
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl font-black uppercase tracking-tighter text-[#c4b5fd] leading-none">
            {artist.name}
          </h1>
          
          <div className="p-6 bg-[#16162a] rounded-xl border border-[#2d2d44] italic text-gray-300">
            Information : Cet artiste est actuellement disponible pour les prochains événements de la tournée.
          </div>
          
          <button className="bulle-custom w-full py-4 bg-[#5b21b6] hover:bg-[#7c3aed] transition-all font-black uppercase text-sm tracking-widest shadow-lg">
            Voir ses prochains concerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;