import React from 'react';

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function makeFullUrl(path, fallback) {
  if (!path) return fallback;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = apiBase.replace(/\/$/, '');
  if (path.startsWith('/')) return base + path;
  return base + '/' + path;
}

const EventDetail = ({ eventId, concert }) => {
  if (!concert) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-gray-400 text-lg">Concert non trouvé</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Grande Affiche */}
      <div className="w-full aspect-video bg-gradient-to-b from-[#2d2d44] to-[#1a1a2e] rounded-3xl border-2 border-[#5b21b6] overflow-hidden mb-8 shadow-2xl">
        {concert.image ? (
          <img
            src={makeFullUrl(concert.image, '/images/concerts.jpg')}
            alt={concert.name || 'Concert'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-400">Image non disponible</h1>
          </div>
        )}
      </div>

      {/* Infos principales */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 uppercase tracking-widest">
          {concert.artist_id ? `Concert #${concert.artist_id}` : 'Concert'}
        </h1>
      </div>

      {/* Infos Date et Lieu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#2d2d44] border border-[#5b21b6] rounded-2xl py-4 px-6 text-center text-white">
          <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest">Date</p>
          <p className="text-lg font-bold">
            {concert.date ? new Date(concert.date).toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'Date non disponible'}
          </p>
        </div>
        <div className="bg-[#2d2d44] border border-[#5b21b6] rounded-2xl py-4 px-6 text-center text-white">
          <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest">Lieu</p>
          <p className="text-lg font-bold">{concert.location || 'Lieu non disponible'}</p>
        </div>
      </div>

      {/* Billetterie */}
      <div className="bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] rounded-2xl py-6 px-8 text-center mb-8 shadow-lg">
        <p className="text-sm text-white/80 mb-2 uppercase tracking-widest">Acheter une place</p>
        <p className="text-4xl font-black text-white">
          {((concert.price_cents || 0) / 100).toFixed(2)} €
        </p>
      </div>

      {/* Info Supplémentaire */}
      <div className="w-full bg-[#1a1a2e] border-2 border-[#2d2d44] rounded-2xl p-8 min-h-[120px] text-center">
        <p className="text-gray-400 text-lg">
          Détails du concert à venir...
        </p>
      </div>
    </div>
  );
};

export default EventDetail;