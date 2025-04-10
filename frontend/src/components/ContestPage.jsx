import React, { useEffect, useState } from 'react';
import ContestCards from './ContestCards';
import { useContestStore } from '../stores/useContestStore';

const ContestPage = () => {
    const { allContests, fetchContests, isfetchingContests, bookmarkContest, isUpdating, triggerBookmark } = useContestStore();

    useEffect(() => {
        fetchContests();
    }, [triggerBookmark]);

    const [filterstate, setfilterstate] = useState(['upcoming']);

    const handleFilterChange = (newFilter) => {
        setfilterstate((prevfilterstate) =>
            prevfilterstate.includes(newFilter)
                ? prevfilterstate.filter(filter => filter !== newFilter)
                : [...prevfilterstate, newFilter]
        );
    };

    const filteredContests = allContests.filter((contest) => {
        const platformFilters = ['CodeChef', 'CodeForces', 'LeetCode'].filter(platform => filterstate.includes(platform));
        const statusFilters = ['upcoming', 'finished'].filter(status => filterstate.includes(status));
    
        const platformMatch = platformFilters.length === 0 || platformFilters.some(platform => contest.platform.toLowerCase() === platform.toLowerCase());
        const statusMatch = (filterstate.includes('upcoming') && contest.rawStartTime > Date.now()) ||
            (filterstate.includes('finished') && contest.status === 'finished');
    
        const bookmarkMatch = filterstate.includes('Bookmarks') && bookmarkContest.includes(contest._id);
    
        if (filterstate.includes('Bookmarks')) {
            return bookmarkMatch;
        }
    
        if (platformFilters.length && statusFilters.length) {
            return platformMatch && statusMatch;
        }
    
        return statusFilters.length ? statusMatch : platformMatch;
    });
    

    const filters = ['CodeChef', 'CodeForces', 'LeetCode', 'upcoming', 'finished', 'Bookmarks'];


    if (isfetchingContests || isUpdating) {
        return <h1> wait for a while...</h1>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">Contest List</h1>

            {/* Filter Buttons */}
            <div className="flex gap-4 mb-6">
                {filters.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleFilterChange(item)}
                        className={`px-4 py-2 rounded-full ${filterstate.includes(item) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-400 transition`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* Contest Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredContests.map((contest, index) => (
                    <ContestCards key={index} contest={contest} isBookmarked={bookmarkContest.includes(contest._id)}  />
                ))}
            </div>
        </div>
    );
};

export default ContestPage;
