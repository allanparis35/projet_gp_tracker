import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {/* Photo de profil */}
        <div className="cadre-gris h-64 w-full text-lg font-medium border-dashed border-2">
          photo de profil
        </div>

        {/* Infos et Biographie */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="flex flex-wrap gap-4">
            <div className="bulle-custom flex-1 text-center py-3">Nom</div>
            <div className="bulle-custom flex-1 text-center py-3">Prénom</div>
          </div>
          
          <div className="cadre-gris h-32 w-full justify-start items-start p-6 italic text-gray-300">
            "Passionné de musique et de concerts live..."
          </div>

          <button className="bulle-custom w-max px-8 py-3">
            modifier mon profil
          </button>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex justify-around border-b border-[#2d2d44] mb-8 pb-3">
        <span className="text-[#a78bfa] font-bold border-b-2 border-[#5b21b6] pb-3 cursor-pointer">MES PLAYLISTS</span>
        <span className="text-gray-500 cursor-pointer hover:text-white transition-colors">FAVORIS</span>
        <span className="text-gray-500 cursor-pointer hover:text-white transition-colors">ÉVÈNEMENTS</span>
      </div>

      <div className="flex flex-col gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="cadre-gris py-5 w-full justify-between px-8 hover:bg-[#1f1f35]">
            <span className="font-medium text-gray-200">Élément sauvegardé #{i}</span>
            <span className="text-[#5b21b6]">➔</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;