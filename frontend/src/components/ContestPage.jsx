import React, { useEffect, useState } from "react";
import { useContestStore } from "../stores/useContestStore";
import { ContestCard } from "./ContestCards";

export const ContestPage = () => {
  const { fetchContests } = useContestStore();
  const [contests, setContests] = useState([]);
  const [Codechef, setCodechef] = useState(false);
  const [Codeforces, setCodeforces] = useState(false);
  const [Leetcode, setLeetcode] = useState(false);
  const [filterArray, setFilterArray] = useState([]);
  const [Upcoming, setUpcoming] = useState(false);
  const [Ongoing, setOngoing] = useState(false);
  const [Completed, setCompleted] = useState(false);
  const [statusArray, setStatusArray] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);

  const { bookmarkContest } = useContestStore();

  useEffect(() => {
    fetchContests()
      .then((contestsData) => {
        console.log("Fetched Contests:", contestsData);
        setContests(contestsData || []); 
      })
      .catch((error) => {
        console.error("Error fetching contests:", error);
        setContests([]);
      });
  }, []);

  useEffect(() => {
    let newFilterArray = [];
    let newStatusArray = [];
    
    if (Codechef) newFilterArray.push("CodeChef");
    if (Codeforces) newFilterArray.push("Codeforces");
    if (Leetcode) newFilterArray.push("LeetCode");
    if (Upcoming) newStatusArray.push("Upcoming");
    if (Ongoing) newStatusArray.push("Ongoing");
    if (Completed) newStatusArray.push("Completed");
    
    setFilterArray(newFilterArray);
    setStatusArray(newStatusArray);
  }, [Codechef, Codeforces, Leetcode, Upcoming, Ongoing, Completed]);

  console.log("Filter Array:", filterArray);

  const handleAllClick = () => {
    setCodechef(false);
    setCodeforces(false);
    setLeetcode(false);
    setUpcoming(false);
    setOngoing(false);
    setCompleted(false);
    setFilterArray([]);
    setStatusArray([]);
    setBookmarked(false);
  }

  return (
    <div>
      <div className="flex justify-center space-x-4 my-4">
        <div onClick={handleAllClick} className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded-lg">
          All
        </div>

        <div onClick={() => setCodechef(!Codechef)} className={`cursor-pointer px-4 py-2 rounded-lg ${Codechef ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>
          Codechef
        </div>

        <div onClick={() => setCodeforces(!Codeforces)} className={`cursor-pointer px-4 py-2 rounded-lg ${Codeforces ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>
          Codeforces
        </div>

        <div onClick={() => setLeetcode(!Leetcode)} className={`cursor-pointer px-4 py-2 rounded-lg ${Leetcode ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>
          Leetcode
        </div>

        <div onClick={() => setOngoing(!Ongoing)} className={`cursor-pointer px-4 py-2 rounded-lg ${Ongoing ? "bg-green-500 text-white" : "bg-gray-700 text-white"}`}>
          Ongoing
        </div>

        <div onClick={() => setUpcoming(!Upcoming)} className={`cursor-pointer px-4 py-2 rounded-lg ${Upcoming ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"}`}>
          Upcoming
        </div>

        <div onClick={() => setCompleted(!Completed)} className={`cursor-pointer px-4 py-2 rounded-lg ${Completed ? "bg-red-500 text-white" : "bg-gray-700 text-white"}`}>
          Completed
        </div>

        {/* 🔹 Add Toggle Bookmark Button */}
        <div onClick={() => setBookmarked(!bookmarked)} className="cursor-pointer px-4 py-2 bg-purple-500 text-white rounded-lg">
          {bookmarked ? "Show All Contests" : "Show Bookmarks"}
        </div>
      </div>

      {/* 🔹 Show Bookmarked Contests */}
      {bookmarked ? (
        bookmarkContest && bookmarkContest.length > 0 ? (
          bookmarkContest.map((contest, idx) => (
            <div key={idx}>
              <ContestCard
                title={contest.title}
                platform={contest.platform}
                url={contest.url}
                start_time={contest.start_time}
                raw_start_time={contest.raw_start_time}
                raw_duration={contest.raw_duration}
                reg_participants={contest.reg_participants}
                duration={contest.duration}
                statusArray={statusArray}
                contest={contest}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-4">No bookmarked contests available.</p>
        )
      ) : contests.length > 0 ? ( 
        contests
          .filter((contest) => filterArray.length === 0 || filterArray.includes(contest.platform))
          .map((contest, idx) => (
            <div key={idx}>
              <ContestCard
                title={contest.title}
                platform={contest.platform}
                url={contest.url}
                start_time={contest.start_time}
                raw_start_time={contest.raw_start_time}
                raw_duration={contest.raw_duration}
                reg_participants={contest.reg_participants}
                duration={contest.duration}
                statusArray={statusArray}
                contest={contest}
              />
            </div>
          ))
      ) : (
        <p className="text-center text-gray-400 mt-4">No contests available.</p>
      )}
    </div>
  );
};
