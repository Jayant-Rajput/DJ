import { leetCodeContestList } from "./leetapi.controller.js";
import { forcesContestDataFetch } from "./forcesapi.controller.js";
import { codechefContestList } from "./chefapi.controller.js";

export const contestList = async (req, res) => {
    const leetContestList = await leetCodeContestList();
    const chefContestList = await codechefContestList();
    const forcesContestList = await forcesContestDataFetch();
    const allContests = [...chefContestList, ...forcesContestList, ...leetContestList];
    console.log(allContests);
    return res.status(200).json({contests: allContests ,message: "contest List fetched successfully"});
}