import axios from "axios";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core/core.cjs";

export const leetDataFetch = async (username) => {
  
  console.log("INSIDE LEETAPI CONTROLLER");

  const query = `
    query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      contributions {
        points
      }
      profile {
        reputation
        ranking
      }
      submitStats {
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
        name
      }
    }
  }`;

  const variables = { username : username };  

  console.log("INSIDE TRY");
  const response = await axios.post(
    `https://leetcode.com/graphql`,
    { query, variables },
    { headers: { "Content-Type": "application/json" } }
  );

  const data = response.data.data;
  console.log("API RESPONSE: ", data);

  const totalQuestions = {

    All: data.allQuestionsCount.find((q) => q.difficulty === "All")?.count || 0,
    Easy: data.allQuestionsCount.find((q) => q.difficulty === "Easy")?.count || 0,
    Medium: data.allQuestionsCount.find((q) => q.difficulty === "Medium")?.count || 0,
    Hard: data.allQuestionsCount.find((q) => q.difficulty === "Hard")?.count || 0,
  };

  const solvedQuestions = {
    All: data.matchedUser.submitStats.totalSubmissionNum.find((q) => q.difficulty === "All")?.count || 0,
    Easy: data.matchedUser.submitStats.totalSubmissionNum.find((q) => q.difficulty === "Easy")?.count || 0,
    Medium: data.matchedUser.submitStats.totalSubmissionNum.find((q) => q.difficulty === "Medium")?.count || 0,
    Hard: data.matchedUser.submitStats.totalSubmissionNum.find((q) => q.difficulty === "Hard")?.count || 0,
  };

  const profile = {
    reputaiton: data.matchedUser.profile.reputation || 0,
    ranking: data.matchedUser.profile.ranking || 0,
  };

  const contestDetails = data.userContestRanking || {};

  const attendedContestsCount = contestDetails.attendedContestsCount;
  const rating = contestDetails.rating;
  const globalRanking = contestDetails.globalRanking;
  const totalParticipants = contestDetails.totalParticipants;
  const topPercentage = contestDetails.topPercentage;
  const badge = contestDetails.badge;

  const updatedLeetData = {
    totalLeetQuestions: totalQuestions.All,
    easyLeetQuestions: totalQuestions.Easy,
    mediumLeetQuestions: totalQuestions.Medium,
    hardLeetQuestions: totalQuestions.Hard,
    totalSolvedLeetQuestions: solvedQuestions.All,
    easySolvedLeetQuestions: solvedQuestions.Easy,
    mediumSolvedLeetQuestions: solvedQuestions.Medium,
    hardSolvedLeetQuestions: solvedQuestions.Hard,
    leetReputation: profile.reputaiton,
    leetRanking: profile.ranking,
    leetContestCount: attendedContestsCount,
    leetRating: rating,
    leetGlobalRanking: globalRanking,
    leetTotalParticipants: totalParticipants,
    leetTopPercentage: topPercentage,
    leetBadges: badge,
  };

  return updatedLeetData;
};

export const leetCodeContestList = async () => {
  const client = new ApolloClient({
    uri: "https://leetcode.com/graphql",
    cache: new InMemoryCache(),
    headers: {
      "content-type": "application/json",
    },
  });

  const fetchContestsList = async () => {
    try {
      const response = await client.query({
        query: gql`
          query {
            allContests {
              title
              titleSlug
              startTime
              duration
            }
          }
        `,
      });

      const contests = [];
      const currentTime = new Date();

      const contestsData = response.data.allContests;

      contestsData.forEach((data) => {
        const title = data.title;
        const url = `https://leetcode.com/contest/${data.titleSlug}`;

        const startTimeUTC = new Date(data.startTime * 1000);
        const startTimeIST = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(startTimeUTC);

        const endTimeUTC = new Date(startTimeUTC.getTime() + data.duration * 1000);

        if (endTimeUTC <= currentTime) {
          return;
        }

        const hours = Math.floor(data.duration / 3600);
        const minutes = Math.floor((data.duration % 3600) / 60);
        const durationFormatted = `${hours} hours ${minutes} minutes`;

        contests.push({
          platform: "LeetCode",
          title: title,
          url: url,
          start_time: startTimeIST,
          duration: durationFormatted,
        });
      });

      // console.log(contests);
      return contests;
    } catch (error) {
      console.error("Error fetching contests:", error);
      return [];
    }
  };

  return fetchContestsList();
};
