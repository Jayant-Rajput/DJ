import React from 'react';
import { useContestStore } from '../stores/useContestStore.js';
import { useAuthStore } from '../stores/useAuthStore.js';

const ContestCards = ({ contest, isBookmarked }) => {

    const { addBookmark, removeBookmark} = useContestStore();
    const { authUser } = useAuthStore();

    const handleBookmark = async (e) => {
        e.preventDefault();
        
        const data = { contestId: contest._id, userId: authUser._id};
        console.log("handleBookmark: data: ", data);
        await addBookmark(data);
    };
    const handleRemoveBookmark = async (e) => {
        e.preventDefault();
        
        const data = { contestId: contest._id, userId: authUser._id};
        await removeBookmark(data);
    }

    return (
        <div className="bg-white shadow-md rounded-2xl p-4">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">{contest.title}</h2>
            <p className="text-gray-600 mb-1">Platform: {contest.platform}</p>
            <p className="text-gray-600 mb-1">Status: {contest.status}</p>
            <p className="text-gray-600 mb-1">Start Time: {new Date(contest.rawStartTime).toLocaleString()}</p>
            <p className="text-gray-600 mb-1">Duration: {Math.floor(contest.rawDuration / 3600000)} hrs</p>
            <a href={contest.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                View Contest
            </a>
            {contest.solutionLink && (
                <a href={contest.solutionLink} target="_blank" rel="noopener noreferrer" className="block text-green-500 hover:underline mt-2">
                    View Solution
                </a>
            )}
            <button 
                onClick={isBookmarked ? handleRemoveBookmark : handleBookmark} 
                className={`mt-2 px-4 py-2 rounded-lg ${isBookmarked ? 'bg-red-400 hover:bg-red-500' : 'bg-yellow-400 hover:bg-yellow-500'} text-white`}
            >
                {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
            </button>
        </div>
    );
};

export default ContestCards;
