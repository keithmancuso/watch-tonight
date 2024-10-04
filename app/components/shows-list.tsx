import React, { useState, useEffect } from 'react';
import { Drawer } from 'vaul';

interface Show {
    name: string;
    reason: string;
    image: string;
}

interface ShowsListProps {
    message: string;
    status: string;
    onThumbsUp: (showName: string) => void;
    onThumbsDown: (showName: string) => void;
    onWatched: (showName: string) => void;
}

const ShowsList: React.FC<ShowsListProps> = ({ message, status, onThumbsUp, onThumbsDown, onWatched }) => {
    const [shows, setShows] = useState<{ listType: string; suggestions: Show[] } | null>(null);

    useEffect(() => {
        if (message && message.startsWith('{')) {
            try {
                const parsedShows = JSON.parse(message);
                setShows(prevShows => ({
                    ...parsedShows,
                    suggestions: [...(prevShows?.suggestions || []), ...parsedShows.suggestions]
                }));
            } catch (error) {
                console.error('Failed to parse shows:', error);
            }
        }
    }, [message]);

    if (status === 'in_progress') {
        return <div>Updating recommendations...</div>;
    }

    if (!shows) {
        return null;
    }

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4 capitalize">{shows.listType}</h2>
            <div className="flex flex-col space-y-4 pb-4">
                {shows.suggestions.map((show, index) => (
                    <div key={index} className="w-full">
                        <Drawer.Root>
                            <Drawer.Trigger className="w-full">

                                <div className="bg-white w-full rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">

                                    <div className="px-4 py-2">
                                        <h3 className="font-semibold text-lg">{show.name}</h3>
                                        {show.reason && (
                                            <p className="text-sm text-gray-600 mt-2 mb-2">{show.reason}</p>
                                        )}

                                        {shows.listType === "Recomendations" && (
                                            <div className="mt-4 flex justify-center space-x-2">
                                                <button
                                                    className="py-2 px-4 bg-gray-100  hover:bg-gray-200"
                                                    onClick={() => onThumbsUp(show.name)}
                                                >
                                                    👍 Next
                                                </button>
                                                <button
                                                    className="py-2 px-4     bg-gray-100 rounded-full hover:bg-gray-200"
                                                    onClick={() => onThumbsDown(show.name)}
                                                >
                                                    👎 Skip
                                                </button>
                                                <button
                                                    className="py-2 px-4 bg-gray-100 rounded-full hover:bg-gray-200"
                                                    onClick={() => onWatched(show.name)}
                                                >
                                                    ✅ Watched
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </Drawer.Trigger>

                            <Drawer.Portal>
                                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                                <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none">
                                    <div className="p-4 bg-white">
                                        <h3 className="font-semibold text-lg">{show.name}</h3>
                                        {show.reason && (
                                            <p className="text-sm text-gray-600 mt-2 mb-2">{show.reason}</p>
                                        )}
                                    </div>
                                </Drawer.Content>
                            </Drawer.Portal>
                        </Drawer.Root>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowsList;