import React, { useRef } from 'react';
import Trending from './Trending';

const Home = ({ artistes = [], concerts = [], loadingArtists = false, loadingConcerts = false }) => {
  const scrollConcertsRef = useRef(null);
  const scrollArtistsRef = useRef(null);

  // Deduplication globale pour éviter les doublons
  const deduplicateById = (arr) => {
    const seen = new Set();
    return arr.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  const uniqueConcerts = deduplicateById(concerts);
  const uniqueArtists = deduplicateById(artistes);

  const scroll = (containerRef, direction) => {
    if (containerRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        containerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Titre central */}
      <div className="flex justify-center mb-16">
        <h1 className="bulle-custom text-xl px-12 py-3 font-bold uppercase tracking-widest">
          Evenement
        </h1>
      </div>

      {/* Section Événements - HORIZONTAL SCROLL */}
      <section className="mb-16">
        <h2 className="text-[#c4b5fd] mb-6 italic text-sm uppercase tracking-widest ml-2">Prochains concerts :</h2>
        {loadingConcerts ? (
          <p className="text-center py-10 text-gray-400">Chargement des concerts...</p>
        ) : uniqueConcerts.length === 0 ? (
          <p className="text-center py-10 text-gray-400">Aucun concert trouvé.</p>
        ) : (
          <div className="relative group">
            {/* Scroll Container */}
            <div 
              ref={scrollConcertsRef}
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
              style={{ scrollBehavior: 'smooth' }}
            >
              {uniqueConcerts.map((c) => (
                <div 
                  key={c.id} 
                  className="relative flex-shrink-0 w-80 cadre-gris aspect-[4/5] overflow-hidden rounded-lg snap-start border border-[#2d2d44] hover:border-[#5b21b6] transition-all"
                >
                  {/* L'image prend toute la place */}
                  <img
                    src={c.image || 'images/concerts.jpg'}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Texte par-dessus l'image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="font-bold text-lg">{c.artist_id ? `Pass #${c.artist_id}` : 'Concert'}</h3>
                    <p className="text-sm text-gray-300 mt-2">{new Date(c.date).toLocaleDateString()} - {c.location}</p>
                    <p className="mt-3 font-bold text-[#a78bfa] text-lg">{((c.price_cents || 0) / 100).toFixed(2)} €</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => scroll(scrollConcertsRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 bg-[#5b21b6]/30 hover:bg-[#5b21b6]/60 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
              ←
            </button>
            <button
              onClick={() => scroll(scrollConcertsRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 bg-[#5b21b6]/30 hover:bg-[#5b21b6]/60 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
              →
            </button>
          </div>
        )}
      </section>

      {/* Section Tendances */}
      <Trending />

      {/* Section Artistes - HORIZONTAL SCROLL */}
      <section>
        <h2 className="text-[#a78bfa] mb-6 italic text-sm uppercase tracking-widest ml-2">
          artistes :
        </h2>
        {loadingArtists ? (
          <p className="text-center py-10 text-gray-400">Chargement de la scène...</p>
        ) : uniqueArtists.length === 0 ? (
          <p className="text-center py-10 text-gray-400">Aucun artiste trouvé.</p>
        ) : (
          <div className="relative group">
      {/* Scroll Container */}
      <div 
        ref={scrollArtistsRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
    {uniqueArtists.map((artiste) => (
    <div 
      key={artiste.id} 
      // Ajout de "relative" pour que le texte puisse se positionner par-dessus
      className="relative flex-shrink-0 w-72 cadre-gris aspect-[3/4] overflow-hidden rounded-lg snap-start"
    >
      {/* L'image prend toute la place */}
      <img
        src={artiste.image || 'images/daftpunk.jpg'}
        alt={artiste.name}
        className="w-full h-full object-cover border-b border-[#2d2d44]"
      />

      {/* Le conteneur du texte est "absolute" */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center bg-gradient-to-t from-black/80 to-transparent">
          <span className="font-bold uppercase tracking-wider text-sm text-white">
                 {artiste.name}
               </span>
              </div>
             </div>
               ))}
            </div>
            {/* Navigation Buttons */}
            <button
              onClick={() => scroll(scrollArtistsRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 bg-[#5b21b6]/30 hover:bg-[#5b21b6]/60 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
              ←
            </button>
            <button
              onClick={() => scroll(scrollArtistsRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 bg-[#5b21b6]/30 hover:bg-[#5b21b6]/60 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
              →
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
