// Dans ton composant More_artists
const More_artists = ({ artistes, onSelectArtist }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {artistes.map(artiste => (
                <div 
                    key={artiste.id} 
                    onClick={() => onSelectArtist(artiste.id)}
                    className="cursor-pointer group"
                >
                    <div className="rounded-lg overflow-hidden border border-[#2d2d44] group-hover:border-[#5b21b6] transition-all">
                        <img src={artiste.image_url || '/images/default-artist.jpg'}
                         alt={artiste.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <p className="mt-2 font-bold uppercase text-center">{artiste.name}</p>
                </div>
            ))}
        </div>
    );
};