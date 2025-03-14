import React, { useState } from "react";
import { useContestStore } from "../stores/useContestStore";

export const Contest = () => {
  const { fetchContests } = useContestStore();

  const [codechefContests, setCodechefContests] = useState([]);
  const [codeforcesContests, setCodeforcesContests] = useState([]);
  const [leetcodeContests, setLeetcodeContests] = useState([]);

  const handleClick = async () => {
    const allContests = await fetchContests();
    console.log("All fetched contests:", allContests);

    const codechef = allContests.filter(
      (contest) => contest.platform.toLowerCase() === "codechef"
    );
    const codeforces = allContests.filter(
      (contest) => contest.platform.toLowerCase() === "codeforces"
    );
    const leetcode = allContests.filter(
      (contest) => contest.platform.toLowerCase() === "leetcode"
    );

    setCodechefContests(codechef);
    setCodeforcesContests(codeforces);
    setLeetcodeContests(leetcode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      {/* Fetch Button */}
      <button
        onClick={handleClick}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold shadow-md transition-transform transform hover:-translate-y-1"
      >
        Fetch Contests
      </button>

      {/* Grid for the three platforms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* CodeChef Section */}
        <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-xl font-bold border-b-2 border-indigo-500 inline-block pb-1 mb-4">
            CodeChef
          </h2>
          {codechefContests.length > 0 ? (
            codechefContests.map((contest, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-md p-3 mb-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {contest.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Start Time:</strong> {contest.start_time}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Duration:</strong> {contest.duration}
                </p>
                {contest.reg_participants !== undefined && (
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Participants:</strong> {contest.reg_participants}
                  </p>
                )}
                <a
                  href={contest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Visit Contest
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No CodeChef contests available.</p>
          )}
        </div>

        {/* CodeForces Section */}
        <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-xl font-bold border-b-2 border-indigo-500 inline-block pb-1 mb-4">
            CodeForces
          </h2>
          {codeforcesContests.length > 0 ? (
            codeforcesContests.map((contest, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-md p-3 mb-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {contest.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Start Time:</strong> {contest.start_time}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Duration:</strong> {contest.duration}
                </p>
                <a
                  href={contest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Visit Contest
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No CodeForces contests available.</p>
          )}
        </div>

        {/* LeetCode Section */}
        <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-xl font-bold border-b-2 border-indigo-500 inline-block pb-1 mb-4">
            LeetCode
          </h2>
          {leetcodeContests.length > 0 ? (
            leetcodeContests.map((contest, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-md p-3 mb-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {contest.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Start Time:</strong> {contest.start_time}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Duration:</strong> {contest.duration}
                </p>
                <a
                  href={contest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Visit Contest
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No LeetCode contests available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

