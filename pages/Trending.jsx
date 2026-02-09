import React, { useState } from 'react';

const ArtistModal = ({ artist, onClose }) => {
  if (!artist) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-7xl bg-[#0b0b0f] border-2 border-[#2d2d44] rounded-[2.5rem] shadow-2xl p-10 md:p-16 text-white z-60 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-white scale-[1.5]"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3 w-full">
            <img
              src={artist.image || 'images'}
              alt={artist.name}
              className="w-full h-[500px] object-cover rounded-3xl border border-[#2d2d44] shadow-2xl"
            />
          </div>

          <div className="md:w-2/3 w-full">
            <h2 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter">{artist.name}</h2>
            <p className="text-2xl text-gray-300 mb-10 leading-relaxed font-light">
              {artist.bio || 'Pas de biographie disponible'}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="font-bold text-2xl text-[#c4b5fd] mb-6 uppercase tracking-[0.2em]">Musiques phares</h3>
                {artist.topTracks && artist.topTracks.length > 0 ? (
                  <ol className="list-decimal list-inside text-gray-200 text-xl space-y-4">
                    {artist.topTracks.map((t, i) => (
                      <li key={i} className="pb-2 border-b border-white/10">{t}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-xl text-gray-400">Aucun titre renseigné.</p>
                )}
              </div>

              <div>
                <h3 className="font-bold text-2xl text-[#c4b5fd] mb-6 uppercase tracking-[0.2em]">Concerts à venir</h3>
                {artist.upcomingConcerts && artist.upcomingConcerts.length > 0 ? (
                  <ul className="text-gray-200 text-xl">
                    {artist.upcomingConcerts.map((c) => (
                      <li key={c.id || `${c.date}-${c.venue}`} className="py-4 border-b border-[#2d2d44] last:border-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-bold text-2xl">{c.venue || 'Lieu à renseigner'}</div>
                            <div className="text-lg text-gray-400 mt-1">{c.date || 'Date à renseigner'}</div>
                          </div>
                          <div className="text-3xl font-black text-[#a78bfa]">{c.price ? `${c.price} €` : ''}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xl text-gray-400">Aucun concert à venir renseigné.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Trending = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);

  const trends = [
    {
      id: 1,
      name: 'RnBoi',
      img: 'images/rnboi.jpg',
      bio: "RnBoi est un artiste émergent spécialisé en RnB moderne.",
      topTracks: ['Avec moi', 'Mon bébé', 'BTRD'],
      upcomingConcerts: [
        { id: 't1', venue: 'Le Trianon', date: '2026-05-12', price: 35 },
        { id: 't2', venue: 'La Cigale', date: '2026-09-01', price: 42 },
      ],
    },
    {
      id: 2,
      name: 'Eminem',
      img: 'images/eminem.jpg',
      bio: "Eminem est une icône mondiale du rap, originaire de Detroit.",
      topTracks: ['Lose Yourself', 'Stan', 'Without Me'],
      upcomingConcerts: [],
    },
    {
      id: 3,
      name: 'Gims',
      img: 'images/gims.jpg',
      bio: 'Gims, artiste pop/rap français incontournable.',
      topTracks: ['Parisienne', 'Ciel', 'Piano'],
      upcomingConcerts: [{ id: 'g1', venue: 'Accor Arena', date: '2026-11-10', price: 55 }],
    },
    {
      id: 4,
      name: 'Theodora',
      img: 'images/theodora.jpg',
      bio: 'Theodora, voix envoûtante et auteur-compositeur.',
      topTracks: ['Melodrama', 'Zou Bisou', 'Fashion Designa'],
      upcomingConcerts: [],
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-[#a78bfa] mb-6 italic text-sm uppercase tracking-widest ml-2">
        tendances :
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {trends.map((item) => (
          <div
            key={item.id}
            className="cadre-gris aspect-[3/4] relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_40px_rgba(91,33,182,0.25)]"
            onClick={() => setSelectedArtist({
              id: item.id,
              name: item.name,
              image: item.img,
              bio: item.bio,
              topTracks: item.topTracks,
              upcomingConcerts: item.upcomingConcerts
            })}
            role="button"
            tabIndex={0}
          >
            <img
              src={item.img}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,6,23,0.8)] to-transparent"></div>

            <div className="p-4 absolute bottom-4 left-4 right-4">
              <span className="inline-block text-xs text-[#e9d5ff] font-semibold italic px-3 py-1 rounded-md bg-[rgba(91,33,182,0.3)] backdrop-blur-md">
                en vedette
              </span>
              <h3 className="mt-3 text-white font-bold uppercase tracking-wide text-sm">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {selectedArtist && (
        <ArtistModal artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
      )}
    </section>
  );
};

export default Trending;