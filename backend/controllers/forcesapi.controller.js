import axios from "axios";

export const forcesDataFetch = async (username) => {
  let userInfo = null;
  let contests = null;
  console.log("INSIDE FORCES DATA FETCH");

  const response = await axios.get(
    `https://codeforces.com/api/user.info?handles=${username}&checkHistoricHandles=false`
  );
  userInfo = response.data;

  const response1 = await axios.get(
    `https://codeforces.com/api/user.rating?handle=${username}`
  );
  contests = response1.data.result.length;

  const bigresponse = await axios.get(
    `https://codeforces.com/api/user.status?handle=${username}&from=1`
  );

  const submissionDetails = bigresponse.data;
  const submissions = submissionDetails.result;

  const uniqueProblems = new Set();
  const solvedByRating = {};

  submissions.forEach((sub) => {
    if (sub.verdict === "OK") {
      const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
      const rating = sub.problem.rating || "Unrated"; // Handle missing ratings
      if (!uniqueProblems.has(problemId)) {
        uniqueProblems.add(problemId);
        solvedByRating[rating] = (solvedByRating[rating] || 0) + 1;
      }
    }
  });

  const updatedForcesData = {
    totalUniqueSubmissions: uniqueProblems.size,
    forcesRating: userInfo.result[0].rating,
    forcesRank: userInfo.result[0].rank,
    forcesMaxRating: userInfo.result[0].maxRating,
    forcesMaxRank: userInfo.result[0].maxRank,
    forcesContestCount: contests,
    forcesTotalProblemSolved: uniqueProblems.size,
    forcesTotalProblemsolvedByRating: solvedByRating,
  };

  return updatedForcesData;
};

export const forcesContestDataFetch = async () => {
  const response = await axios.get("https://codeforces.com/api/contest.list?gym=false");
  const contestData = response.data.result;
  const contests = [];

  if (response.status === 200) {
    contestData.forEach((data) => {
      const title = data["name"];
      const url = `https://codeforces.com/contests/${data["id"]}`;
      const start_time_timestamp = data["startTimeSeconds"];
      const date = new Date(start_time_timestamp * 1000);
      const start_date = date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const duration_timestamp = data["durationSeconds"];
      const duration_ms = new Date(duration_timestamp * 1000);
      const hours = duration_ms.getUTCHours().toString().padStart(2, "0");
      const minutes = duration_ms.getUTCMinutes().toString().padStart(2, "0");
      const duration = `${hours} hours ${minutes} minutes`;

      const startDate = new Date(start_time_timestamp * 1000);
      const endDate = new Date(startDate.getTime() + duration_timestamp * 1000);
      const currentIST = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      if (currentIST < endDate) {
        contests.push({
          title,
          platform: "Codeforces",
          url,
          start_time: start_date,
          duration,
          raw_start_time: date,
          raw_duration: duration_timestamp, // in seconds
        });
      }
    });
  }
  return contests;
};
 