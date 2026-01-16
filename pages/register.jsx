import React, { useState } from 'react';

const Register = ({ onRegisterSuccess, onShowAccount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Inscription réussie !");
        if (onRegisterSuccess) onRegisterSuccess();
      } else {
        const msg = await response.text();
        setError(msg || "L'inscription a échoué.");
      }
    } catch (err) {
      setError("Erreur réseau : Le serveur ne répond pas.");
    }
  };

  const handleHaveAccount = (e) => {
    e.preventDefault();
    if (onShowAccount) onShowAccount();
    else window.location.href = '/';
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md p-10 bg-[#1a1a2e] border border-[#2d2d44] rounded-[2.5rem] shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-[0.2em] text-white">
          Inscription
        </h2>

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
            Créer un compte
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400">
          J'ai déjà un compte ?
          <button onClick={handleHaveAccount} className="text-[#a78bfa] font-bold hover:underline ml-2">J'ai un compte</button>
        </p>
      </div>
    </div>
  );
};

export default Register;