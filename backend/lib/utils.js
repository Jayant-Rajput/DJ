import jwt from "jsonwebtoken";
import { leetCodeContestList } from "../controllers/leetapi.controller.js";
import { forcesContestDataFetch } from "../controllers/forcesapi.controller.js";
import { codechefContestList } from "../controllers/chefapi.controller.js";
import { scrapCodechefData } from "../webscrapping/scrapRating.js";
import { leetDataFetch } from "../controllers/leetapi.controller.js";
import { forcesDataFetch } from "../controllers/forcesapi.controller.js";
import Contest from "../models/contest.model.js";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "none", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV === "development",
  });

  return token;
};

export const fetchDataAndUpdateDB = async () => {
  try {
    const leetContestDetails = await leetCodeContestList();
    const forcesContestDetails = await forcesContestDataFetch();
    const chefContestDetails = await codechefContestList();

    const allDetails = [
      ...leetContestDetails,
      ...forcesContestDetails,
      ...chefContestDetails,
    ];

    await addContestsToDB(allDetails);
    await updateFinishedContests();
  } catch (error) {
    console.log("ERROR in fetchDataAndUpdateDB function : ", error);
  }
};

const addContestsToDB = async (contests) => {
  try {
    
    for (const contest of contests) {
      const existingContest = await Contest.findOne({
        title: contest.title,
        rawStartTime: contest.raw_start_time,
      });

      if (!existingContest) {
        const newContest = new Contest({
          title: contest.title,
          rawStartTime: contest.raw_start_time,
          platform: contest.platform,
          status: "upcoming",
          rawDuration: contest.raw_duration,
          url: contest.url,
        });

        await newContest.save();
      }
    }
  } catch (error) {
    console.log("ERROR in addContestsToDB function : ", error);
  }
};

const updateFinishedContests = async () => {
  try {
    const rawCurrentTime = new Date().getTime();

    const result = await Contest.updateMany(
      { rawStartTime: { $lt: rawCurrentTime } }, // Compare with rawStartTime in milliseconds
      { $set: { status: "finished" } }
    );
  } catch (error) {
    console.log("ERROR in updateFinishedContests function : ", error);
  }
};

export const ratingsFetchKrDeBhai = async (ccId, cfId, leetId) => {
  try {
    let chefRating = -1;
    let chefStars = "stars";
    let chefTotalProblemSolved = -1;
    let chefContestCount = -1;

    try {
      const { currentRating, stars, contests, totalProblemsSolved } =
        await scrapCodechefData(ccId);
      chefRating = currentRating;
      chefStars = stars;
      chefTotalProblemSolved = totalProblemsSolved;
      chefContestCount = contests;
    } catch (error) {
      console.log("Error in scraping codechef rating : ", error);
    }

    let updatedLeetData = null;
    try {
      updatedLeetData = await leetDataFetch(leetId);
    } catch (error) {
      console.log("Error in fetching leet data : ", error);
    }

    let updatedForcesData = null;
    try {
      updatedForcesData = await forcesDataFetch(cfId);
    } catch (error) {
      console.log("Error in fetching forces data : ", error);
    }

    const updatedData = {
      totalLeetQuestions: updatedLeetData.totalLeetQuestions,
      easyLeetQuestions: updatedLeetData.easyLeetQuestions,
      mediumLeetQuestions: updatedLeetData.mediumLeetQuestions,
      hardLeetQuestions: updatedLeetData.hardLeetQuestions,
      totalSolvedLeetQuestions: updatedLeetData.totalSolvedLeetQuestions,
      easySolvedLeetQuestions: updatedLeetData.easySolvedLeetQuestions,
      mediumSolvedLeetQuestions: updatedLeetData.mediumSolvedLeetQuestions,
      hardSolvedLeetQuestions: updatedLeetData.hardSolvedLeetQuestions,
      leetReputation: updatedLeetData.leetReputation,
      leetRanking: updatedLeetData.leetRanking,
      leetContestCount: updatedLeetData.leetContestCount,
      leetRating: updatedLeetData.leetRating,
      leetGlobalRanking: updatedLeetData.leetGlobalRanking,
      leetTotalParticipants: updatedLeetData.leetTotalParticipants,
      leetTopPercentage: updatedLeetData.leetTopPercentage,
      // leetBadges: updatedLeetData.leetBadges,                 //handle it later.
      forcesRating: updatedForcesData.forcesRating,
      forcesRank: updatedForcesData.forcesRank,
      forcesMaxRating: updatedForcesData.forcesMaxRating,
      forcesMaxRank: updatedForcesData.forcesMaxRank,
      forcesContestCount: updatedForcesData.forcesContestCount,
      forcesTotalProblemSolved: updatedForcesData.forcesTotalProblemSolved,
      forcesTotalProblemsolvedByRating:
        updatedForcesData.forcesTotalProblemsolvedByRating,
      chefRating,
      chefStars,
      chefTotalProblemSolved,
      chefContestCount,
    };

    return updatedData;
  } catch (error) {
    console.log("ERROR in ratingsFetchKrDeBhai function : ", error);
  }
};
