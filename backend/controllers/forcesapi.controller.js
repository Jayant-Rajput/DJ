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
