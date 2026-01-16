import react from 'react';

const Research = () => {  
    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                {/* Barre de recherche */}
                <div className="cadre-gris h-64 w-full text-lg font-medium border-dashed border-2 flex items-center justify-center">
                    barre de recherche
                </div>
                {/* Filtres */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="flex flex-wrap gap-4">
                        <div className="bulle-custom flex-1 text-center py-3">Filtre 1</div>
                        <div className="bulle-custom flex-1 text-center py-3">Filtre 2</div>
                        <div className="bulle-custom flex-1 text-center py-3">Filtre 3</div>
                    </div>
                    <div className="cadre-gris h-32 w-full justify-start items-start p-6 italic text-gray-300">
                        "Affichage des résultats de recherche en fonction des filtres sélectionnés..."
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default Research;