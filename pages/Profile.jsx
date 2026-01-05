import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Haut du profil */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        
        {/* Photo de profil type accueil */}
        <div className="cadre-gris h-64 w-full text-lg font-medium">
          photo de profil
        </div>

        {/* Infos et Biographie */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="bulle-custom flex-1 text-center">Nom</div>
            <div className="bulle-custom flex-1 text-center">Prénom</div>
            <div className="flex gap-2">
               {[1, 2, 3].map(i => (
                 <div key={i} className="w-10 h-10 border-2 border-purple-600 rounded-full"></div>
               ))}
            </div>
          </div>
          
          {/* Bloc Biographie type accueil */}
          <div className="cadre-gris h-32 w-full justify-start items-start text-left italic">
            biographie...
          </div>

          <button className="bulle-custom w-max hover:bg-purple-900 transition-colors">
            modifier mon profil
          </button>
        </div>
      </div>

      {/* Onglets de navigation bas */}
      <div className="flex justify-around border-b border-gray-800 mb-8 pb-3">
        <span className="text-purple-400 font-bold border-b-2 border-purple-400 cursor-pointer">MES PLAYLISTS</span>
        <span className="text-gray-500 cursor-pointer hover:text-white">MES ARTISTES FAVORIS</span>
        <span className="text-gray-500 cursor-pointer hover:text-white">MES ÉVÈNEMENTS</span>
      </div>

      {/* Liste des playlists avec le style gris */}
      <div className="flex flex-col gap-4">
        <div className="cadre-gris py-4 w-full">playlist 1 / artiste 1 / évènement 1</div>
        <div className="cadre-gris py-4 w-full">playlist 2 / artiste 2 / évènement 2</div>
        <div className="cadre-gris py-4 w-full">playlist 3 / artiste 3 / évènement 3</div>
      </div>
    </div>
  );
};

export default Profile;