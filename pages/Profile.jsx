import React, { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('artistes');
  const [isEditing, setIsEditing] = useState(false);
  
  // État pour les données du profil
  const [profileData, setProfileData] = useState({
    username: 'RnbOi',
    bio: 'Passionné de musique et de concerts live...'
  });

  // État temporaire pour le formulaire d'édition
  const [editData, setEditData] = useState({
    username: profileData.username,
    bio: profileData.bio
  });

  // Exemple de structure de données (à remplacer par vos appels API Go)
  const favoriteArtists = [
    { id: 1, name: "Daft Punk", genre: "Electronic" },
    { id: 2, name: "Justice", genre: "French Touch" }
  ];

  const tickets = [
    { id: 101, event: "Coachella 2026", date: "15/04/2026", status: "A venir" },
    { id: 102, event: "Rock en Seine", date: "22/08/2025", status: "Terminé" }
  ];

  // Fonctions pour gérer l'édition
  const handleEditClick = () => {
    setEditData({
      username: profileData.username,
      bio: profileData.bio
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData({
      username: editData.username,
      bio: editData.bio
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      {/* Header Profil - Mode Lecture */}
      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div className="cadre-gris h-64 w-full flex items-center justify-center border-dashed border-2 rounded-xl">
            <div className="bg-gray-800 w-full h-full flex items-center justify-center">
              <img src="images/rnboi.jpg" alt="Photo de profil" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="bulle-custom text-center py-3 bg-[#1f1f35] rounded-full text-lg font-semibold">{profileData.username}</div>
            <div className="cadre-gris h-32 w-full p-6 italic text-gray-400 bg-[#16162a] rounded-xl border border-gray-800">
              "{profileData.bio}"
            </div>
            <button 
              onClick={handleEditClick}
              className="bulle-custom w-max px-8 py-3 bg-[#5b21b6] rounded-full hover:bg-[#7c3aed] transition-all">
              modifier mon profil
            </button>
          </div>
        </div>
      ) : (
        /* Header Profil - Mode Édition */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div className="cadre-gris h-64 w-full flex items-center justify-center border-dashed border-2 rounded-xl">
            <div className="bg-gray-800 w-full h-full flex items-center justify-center">
              <img src="images/rnboi.jpg" alt="Photo de profil" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6">
            <input 
              type="text" 
              name="username"
              value={editData.username}
              onChange={handleInputChange}
              placeholder="Pseudo"
              className="bulle-custom px-4 py-3 bg-[#1f1f35] rounded-full text-center text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5b21b6]"
            />
            <textarea 
              name="bio"
              value={editData.bio}
              onChange={handleInputChange}
              placeholder="Votre bio..."
              className="cadre-gris w-full p-6 text-white bg-[#16162a] rounded-xl border border-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#5b21b6]"
              rows="4"
            />
            <div className="flex gap-4">
              <button 
                onClick={handleSave}
                className="bulle-custom px-8 py-3 bg-green-600 rounded-full hover:bg-green-700 transition-all">
                Sauvegarder
              </button>
              <button 
                onClick={handleCancel}
                className="bulle-custom px-8 py-3 bg-gray-600 rounded-full hover:bg-gray-700 transition-all">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Onglets modifiés */}
      <div className="flex justify-start gap-12 border-b border-[#2d2d44] mb-8 pb-3">
        <button 
          onClick={() => setActiveTab('artistes')}
          className={`${activeTab === 'artistes' ? 'text-[#a78bfa] border-[#5b21b6]' : 'text-gray-500'} font-bold border-b-2 pb-3 transition-all`}
        >
          ARTISTES FAVORIS
        </button>
        <button 
          onClick={() => setActiveTab('evenements')}
          className={`${activeTab === 'evenements' ? 'text-[#a78bfa] border-[#5b21b6]' : 'text-gray-500'} font-bold border-b-2 pb-3 transition-all`}
        >
          MES BILLETS & HISTORIQUE
        </button>
      </div>

      {/* Affichage conditionnel selon l'onglet */}
      <div className="flex flex-col gap-4">
        {activeTab === 'artistes' ? (
          favoriteArtists.map(artist => (
            <div key={artist.id} className="cadre-gris py-5 w-full flex justify-between px-8 hover:bg-[#1f1f35] bg-[#16162a] rounded-lg border border-gray-800">
              <div>
                <span className="font-medium text-gray-200 block">{artist.name}</span>
                <span className="text-sm text-gray-500">{artist.genre}</span>
              </div>
              <span className="text-[#5b21b6] text-2xl">♥</span>
            </div>
          ))
        ) : (
          tickets.map(ticket => (
            <div key={ticket.id} className="cadre-gris py-5 w-full flex justify-between px-8 hover:bg-[#1f1f35] bg-[#16162a] rounded-lg border border-gray-800">
              <div className="flex flex-col">
                <span className="font-medium text-gray-200">{ticket.event}</span>
                <span className="text-sm text-gray-400">{ticket.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs ${ticket.status === 'A venir' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'}`}>
                  {ticket.status}
                </span>
                <span className="text-[#5b21b6]">➔</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;