import React from 'react';

const Home = () => {
  return (
    <div className="p-8">
      {/* Titre central */}
      <div className="flex justify-center mb-8">
        <h1 className="bg-gray-200 border-2 border-black px-12 py-2 rounded-full text-xl font-bold uppercase">
          Evenement
        </h1>
      </div>

      {/* Section Prochainement 1 */}
      <section className="mb-12">
        <h2 className="bg-gray-200 border border-black px-6 py-1 rounded-full w-fit mb-4">
          tendances :
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[3/4] bg-gray-300 border-2 border-black rounded-2xl flex items-center justify-center">
              exemple
            </div>
          ))}
        </div>
      </section>

      {/* Section Prochainement 2 */}
      <section>
        <h2 className="bg-gray-200 border border-black px-6 py-1 rounded-full w-fit mb-4">
          artistes :
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[3/4] bg-gray-300 border-2 border-black rounded-2xl flex items-center justify-center">
              exemple
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;