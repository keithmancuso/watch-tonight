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
    onThumbsUp: (showName: string) => void;
    onThumbsDown: (showName: string) => void;
    onWatched: (showName: string) => void;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies, onThumbsUp, onThumbsDown, onWatched }) => {
    return (
        <div className="container mx-auto px-4 flex justify-center my-10">
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
                                <div className="mt-4 flex justify-center space-x-2">
                                    <button
                                        className="py-2 px-4 bg-gray-100 rounded-full hover:bg-gray-200"
                                        onClick={() => onThumbsUp(show.name)}
                                    >
                                        👍
                                    </button>
                                    <button
                                        className="py-2 px-4     bg-gray-100 rounded-full hover:bg-gray-200"
                                        onClick={() => onThumbsDown(show.name)}
                                    >
                                        👎
                                    </button>
                                    <button
                                        className="py-2 px-4 bg-gray-100 rounded-full hover:bg-gray-200"
                                        onClick={() => onWatched(show.name)}
                                    >
                                        ✅
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieCarousel;