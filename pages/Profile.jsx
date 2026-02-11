import React, { useState, useEffect } from 'react';

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function makeFullUrl(path, fallback) {
  if (!path || path.startsWith('data:')) return fallback;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = apiBase.replace(/\/$/, '');
  return path.startsWith('/') ? base + path : base + '/' + path;
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState('evenements');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({ surname: '', bio: '', image: '', tickets: [] });
  const [editData, setEditData] = useState({ surname: '', bio: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
const response = await fetch(`${apiBase}/profile/`, { 
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setEditData({ surname: data.surname || '', bio: data.bio || '' });
      }
    } catch (error) {
      console.error("Erreur chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${apiBase}/profile/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          first_name: profileData.first_name || "",
          last_name: profileData.last_name || "",
          surname: editData.surname,
          bio: editData.bio,
          image: profileData.image || ""
        })
      });

      if (response.ok) {
        setProfileData(prev => ({ 
    ...prev, 
    surname: editData.surname, 
    bio: editData.bio 
  }));
  setIsEditing(false);
  alert("Sauvegardé !");
      } else {
        alert("Erreur serveur lors de la sauvegarde.");
      }
    } catch (error) {
      alert("Erreur de connexion.");
    }
  };

  if (loading) return <div className="text-center p-20 text-white font-bold uppercase tracking-widest">Chargement...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        <div className="cadre-gris h-64 w-full flex items-center justify-center border-2 border-[#5b21b6] rounded-xl overflow-hidden shadow-2xl">
          <img src={makeFullUrl(profileData.image, '/images/default-avatar.png')} alt="Profil" className="w-full h-full object-cover" />
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          {!isEditing ? (
            <>
              <div className="bulle-custom text-center py-3 bg-[#1f1f35] border border-[#5b21b6] rounded-full text-lg font-bold uppercase tracking-widest text-[#a78bfa]">
                {profileData.surname || 'Utilisateur'}
              </div>
              <div className="cadre-gris min-h-32 w-full p-6 italic text-gray-300 bg-[#16162a] rounded-xl border border-[#2d2d44]">
                "{profileData.bio || 'Ma bio est encore vide...'}"
              </div>
              <button onClick={() => setIsEditing(true)} className="bulle-custom w-max px-8 py-3 bg-[#5b21b6] hover:bg-[#7c3aed] rounded-full transition-all uppercase text-xs font-black shadow-lg">
                modifier mon profil
              </button>
            </>
          ) : (
            <>
              <input 
                type="text" 
                name="surname"
                value={editData.surname}
                onChange={(e) => setEditData({...editData, surname: e.target.value})}
                className="bulle-custom px-4 py-3 bg-[#1f1f35] border-2 border-[#5b21b6] rounded-full text-center text-white outline-none"
              />
              <textarea 
                name="bio"
                value={editData.bio}
                onChange={(e) => setEditData({...editData, bio: e.target.value})}
                className="cadre-gris w-full p-6 text-white bg-[#16162a] border-2 border-[#2d2d44] rounded-xl resize-none outline-none focus:border-[#5b21b6]"
                rows="4"
              />
              <div className="flex gap-4">
                <button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold uppercase text-xs transition-all">Sauvegarder</button>
                <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-700 hover:bg-gray-800 py-3 rounded-xl font-bold uppercase text-xs transition-all">Annuler</button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="border-b border-[#2d2d44] mb-8 pb-3">
        <button className="text-[#a78bfa] border-[#5b21b6] font-bold border-b-2 pb-3 uppercase tracking-widest text-sm">MES BILLETS</button>
      </div>

      <div className="flex flex-col gap-4">
        {profileData.tickets && profileData.tickets.length > 0 ? (
          profileData.tickets.map(ticket => (
            <div key={ticket.concert_id} className="cadre-gris py-5 w-full flex justify-between px-8 bg-[#16162a] border border-[#2d2d44] rounded-lg hover:border-[#5b21b6] transition-all">
              <div className="flex flex-col">
                <span className="font-bold text-[#a78bfa] uppercase">{ticket.name}</span>
                <span className="text-sm text-gray-400">🗓️ {new Date(ticket.date).toLocaleDateString()}</span>
                <span className="text-xs text-gray-500 uppercase">{ticket.location}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[#5b21b6] font-black cursor-pointer hover:text-white">PDF ➔</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-gray-600 italic">Aucun billet pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;