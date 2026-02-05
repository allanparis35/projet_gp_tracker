import React from 'react';
import Trending from './Trending';

const Home = ({ artistes = [], concerts = [], loadingArtists = false, loadingConcerts = false }) => {
  return (
    <div className="p-4 md:p-8">
      {/* Titre central */}
      <div className="flex justify-center mb-16">
        <h1 className="bulle-custom text-xl px-12 py-3 font-bold uppercase tracking-widest">
          Evenement
        </h1>
      </div>

      {/* Section Événements */}
      <section className="mb-12">
        <h2 className="text-[#c4b5fd] mb-6 italic text-sm uppercase tracking-widest ml-2">Prochains concerts :</h2>
        {loadingConcerts ? (
          <p className="col-span-full text-center py-10 text-gray-400">Chargement des concerts...</p>
        ) : concerts.length === 0 ? (
          <p className="col-span-full text-center py-10 text-gray-400">Aucun concert trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {concerts.map((c) => (
              <div key={c.id} className="cadre-gris p-4 border border-[#2d2d44] hover:border-[#5b21b6] transition-all">
                <h3 className="font-bold">{c.artist}</h3>
                <p className="text-sm text-gray-400">{new Date(c.date).toLocaleDateString()} - {c.venue}</p>
                <p className="mt-4 font-bold">{c.price} €</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section Tendances */}
<Trending />

      {/* Section Artistes */}
      <section>
        <h2 className="text-[#a78bfa] mb-6 italic text-sm uppercase tracking-widest ml-2">
          artistes :
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loadingArtists ? (
            <p className="col-span-full text-center py-10 text-gray-400">Chargement de la scène...</p>
          ) : artistes.length === 0 ? (
            <p className="col-span-full text-center py-10 text-gray-400">Aucun artiste trouvé.</p>
          ) : (
            artistes.map((artiste) => (
              <div key={artiste.id} className="cadre-gris aspect-[3/4] flex-col gap-4 p-0 overflow-hidden rounded-lg">
                <img
                  src={artiste.image || 'https://via.placeholder.com/300'}
                  alt={artiste.name}
                  className="w-full h-2/3 object-cover border-b border-[#2d2d44]"
                />
                <div className="p-4 text-center">
                  <span className="font-bold uppercase tracking-wider">{artiste.name}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;