import React from 'react';
import Image from 'next/image';

interface TVShow {
    name: string;
    reason: string;
    image: string;
}

interface MovieCarouselProps {
    movies: {
        suggestions: TVShow[];
    };
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
    return (
        <div className="movie-carousel">
            <h2 className="text-2xl font-bold mb-4">TV Show Suggestions</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4">
                {movies.suggestions.map((show, index) => (
                    <div key={index} className="flex-none w-64">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Image
                                src={show.image}
                                alt={show.name}
                                width={256}
                                height={144}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">{show.name}</h3>
                                <p className="text-sm text-gray-600">{show.reason}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieCarousel;