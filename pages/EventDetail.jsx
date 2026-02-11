import React, { useState } from 'react';

const EventDetail = ({ eventId, concert: initialConcert }) => {
  const [concert, setConcert] = useState(initialConcert);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false); // Pour afficher/cacher le formulaire
  const [buyerInfo, setBuyerInfo] = useState({ firstName: '', lastName: '' });

  if (!concert) return <div className="text-white">Concert non trouvé</div>;

  const makeFullUrl = (path, fallback) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  return `http://localhost:8080${path.startsWith('/') ? '' : '/'}${path}`;
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleBuy = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (!buyerInfo.firstName || !buyerInfo.lastName) {
      setMessage(" Veuillez remplir votre nom et prénom.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/tickets/buy/${concert.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify(buyerInfo)
      });
      if (response.ok) {
        setMessage(" Achat réussi ! Votre place est disponible dans votre profil.");
        // mise à jour de l'affichage local du nombre de tickets
        setShowForm(false); // Cache le formulaire après succès
        setConcert({...concert,total_tickets: concert.total_tickets - 1
        });
      } else {
        const errorData = await response.json();
        setMessage(` Erreur : ${errorData.error || "Achat impossible"}`);
      }
    } catch (err) {
      setMessage(" Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
 {/* Grande Affiche */}
<div className="w-full aspect-video bg-gradient-to-b from-[#2d2d44] to-[#1a1a2e] rounded-3xl border-2 border-[#5b21b6] overflow-hidden mb-8 shadow-2xl">
  {concert.image_url ? ( // Vérifie si l'URL de l'image existe
    <img
      src={makeFullUrl(concert.image_url, '/images/concerts.jpg')}
      alt={concert.location || 'Concert'}
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
          {concert.artist_name ? `Concert: ${concert.artist_name}` : 'Concert'}
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
      <div className="mb-8">
        {/* // MODIF : Si showForm est faux, on affiche le bouton d'achat classique */}
        {!showForm ? (
          concert.total_tickets > 0 ? (
            <button 
              onClick={() => setShowForm(true)} // // MODIF : Au clic, on affiche le formulaire
              className="w-full bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#5b21b6] rounded-2xl py-6 px-8 text-center shadow-lg transition-transform transform hover:scale-[1.01] active:scale-95 cursor-pointer border-none"
            >
              <p className="text-sm text-white/80 mb-2 uppercase tracking-widest">
                Acheter une place ({concert.total_tickets} restantes)
              </p>
              <p className="text-4xl font-black text-white">
                {((concert.price_cents || 0) / 100).toFixed(2)} €
              </p>
            </button>
          ) : (
            <div className="w-full bg-gray-600 rounded-2xl py-6 px-8 text-center shadow-lg">
              <p className="text-4xl font-black text-white uppercase">Complet</p>
            </div>
          )
        ) : (
          /* // MODIF : Si showForm est vrai, on affiche le formulaire de saisie */
          <form onSubmit={handleBuy} className="bg-[#2d2d44] border-2 border-[#5b21b6] rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center text-white uppercase tracking-widest">Vos Informations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase">Prénom</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={buyerInfo.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1a2e] border border-[#5b21b6] rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-[#7c3aed]"
                  placeholder="Ex: Jean"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase">Nom</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={buyerInfo.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1a2e] border border-[#5b21b6] rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-[#7c3aed]"
                  placeholder="Ex: Dupont"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-bold uppercase transition-all"
              >
                Confirmer l'achat
              </button>
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-800 text-white rounded-xl py-4 font-bold uppercase transition-all"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {message && (
          <p className="mt-4 text-center text-white font-bold p-3 bg-[#2d2d44] rounded-xl border border-[#5b21b6]">
            {message}
          </p>
        )}
      </div>

      <div className="w-full bg-[#1a1a2e] border-2 border-[#2d2d44] rounded-2xl p-8 min-h-[120px] text-center">
        <p className="text-gray-400 text-lg">
          {concert.detail || "Détails du concert à venir..."}
        </p>
      </div>
    </div>
  );
};

export default EventDetail;