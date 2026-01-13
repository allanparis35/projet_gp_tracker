import React, { useState } from 'react';

const Account = ({ onLoginSuccess, onShowRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setError("Identifiants invalides. Veuillez réessayer.");
      }
    } catch (err) {
      setError("Erreur : Impossible de contacter le serveur.");
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    if (onShowRegister) onShowRegister();
    else window.location.href = '/register';
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md p-10 bg-[#1a1a2e] border border-[#2d2d44] rounded-[2.5rem] shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center uppercase tracking-[0.2em] text-white">
          Compte
        </h2>

        <p className="text-center text-gray-400 mb-6">
          Connectez-vous pour accéder à vos favoris et événements.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 text-red-200 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[#a78bfa] text-xs font-bold uppercase ml-2 tracking-widest">Email</label>
            <input
              className="input-field"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#a78bfa] text-xs font-bold uppercase ml-2 tracking-widest">Mot de passe</label>
            <input
              className="input-field"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-[#5b21b6] text-white py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#4c1d95] hover:shadow-[0_0_25px_rgba(91,33,182,0.5)] active:scale-95"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-400">Pas de compte ? </span>
          <button
            onClick={handleRegisterClick}
            className="ml-2 text-[#a78bfa] font-bold hover:underline"
            aria-label="S'inscrire"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;