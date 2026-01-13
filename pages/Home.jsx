import React from 'react';

const Home = ({ artistes = [], loading = false }) => {
  return (
    <div className="p-4 md:p-8">
      {/* Titre central */}
      <div className="flex justify-center mb-16">
        <h1 className="bulle-custom text-xl px-12 py-3 font-bold uppercase tracking-widest">
          Evenement
        </h1>
      </div>

      {/* Section Tendances */}
      <section className="mb-16">
        <h2 className="text-[#a78bfa] mb-6 italic text-sm uppercase tracking-widest ml-2">
          tendances :
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Exemple statique : remplacez par données réelles si besoin */}
          {[
            { id: 1, title: 'Mainstage', img: 'https://via.placeholder.com/400x560?text=Mainstage' },
            { id: 2, title: 'After Party', img: 'https://via.placeholder.com/400x560?text=After+Party' },
            { id: 3, title: 'Acoustic', img: 'https://via.placeholder.com/400x560?text=Acoustic' },
            { id: 4, title: 'VIP', img: 'https://via.placeholder.com/400x560?text=VIP' },
          ].map((item) => (
            <div
              key={item.id}
              className="cadre-gris aspect-[3/4] relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_40px_rgba(91,33,182,0.18)]"
            >
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,6,23,0.65)] to-[rgba(0,0,0,0.08)]"></div>

              <div className="p-4 absolute bottom-4 left-4 right-4">
                <span className="inline-block text-xs text-[#e9d5ff] font-semibold italic px-3 py-1 rounded-md bg-[rgba(91,33,182,0.12)] backdrop-blur-md">
                  en vedette
                </span>
                <h3 className="mt-3 text-white font-bold uppercase tracking-wide text-sm">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Artistes */}
      <section>
        <h2 className="text-[#a78bfa] mb-6 italic text-sm uppercase tracking-widest ml-2">
          artistes :
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
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