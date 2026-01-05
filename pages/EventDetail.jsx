import React from 'react';

const EventDetail = () => {
  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Grande Affiche */}
      <div className="w-full aspect-video bg-gray-300 rounded-3xl border-2 border-black flex items-center justify-center mb-6">
        <h1 className="text-2xl text-gray-700 font-bold">affiche de l'événement</h1>
      </div>

      {/* Infos Date et Lieu */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 bg-white border border-black rounded-full py-2 px-6 text-center">
          date de l'evenement et heure
        </div>
        <div className="flex-1 bg-white border border-black rounded-full py-2 px-6 text-center">
          adresse
        </div>
      </div>

      {/* Billetterie */}
      <div className="w-2/3 mx-auto bg-gray-200 border border-black rounded-full py-2 text-center mb-6 font-bold uppercase tracking-widest">
        billetterie
      </div>

      {/* Info Supplémentaire */}
      <div className="w-full bg-gray-100 border-2 border-black rounded-2xl p-8 min-h-[100px] text-center text-gray-600">
        Info suplémentaire
      </div>
    </div>
  );
};

export default EventDetail;