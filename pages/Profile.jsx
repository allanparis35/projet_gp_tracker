import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header Profil */}
      <div className="flex gap-8 items-start mb-10">
        {/* Photo de profil */}
        <div className="w-48 h-48 bg-gray-300 rounded-2xl border-2 border-black flex items-center justify-center">
          <span className="text-gray-600">photo de profil</span>
        </div>

        {/* Infos et Bio */}
        <div className="flex-1 space-y-4">
          <div className="flex gap-4">
            <div className="bg-white px-4 py-1 rounded-full border border-black text-sm">abonnements 0</div>
            <div className="bg-white px-4 py-1 rounded-full border border-black text-sm">abonnés 0</div>
          </div>
          
          <div className="bg-gray-200 p-6 rounded-2xl border border-black h-24 flex items-center justify-center">
            biographie
          </div>

          <button className="bg-gray-300 px-6 py-2 rounded-full border border-black font-semibold">
            modifier mon profil
          </button>
        </div>

        {/* Réseaux (Comptes Pro) */}
        <div className="flex flex-col gap-2">
          {['I', 'S', 'T'].map(letter => (
            <div key={letter} className="w-10 h-10 bg-white border border-black rounded-full flex items-center justify-center font-bold">
              {letter}
            </div>
          ))}
        </div>
      </div>

      {/* Onglets / Sélections */}
      <div className="flex justify-around mb-4 text-sm font-bold uppercase">
        <span className="cursor-pointer border-b-2 border-black">mes playlists</span>
        <span className="cursor-pointer text-gray-500">mes artistes favoris</span>
        <span className="cursor-pointer text-gray-500">mes évènements</span>
      </div>

      {/* Liste des éléments */}
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-gray-600 text-white p-4 rounded-xl flex justify-center italic">
            playlist {item} / artiste {item} / évènement {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;