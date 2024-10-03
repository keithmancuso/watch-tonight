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
        <div className="container mx-auto px-4 flex justify-center">
            <div className="flex flex-col space-y-4 pb-4">
                {movies.suggestions.map((show, index) => (
                    <div key={index} className="w-full max-w-md">
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