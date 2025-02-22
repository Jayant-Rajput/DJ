import {React, useEffect} from "react";
import { useAuthStore } from "../stores/useAuthStore";

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* authUser Info */}
      <div className="flex items-center gap-4 border-b pb-4">
        <img
          src={authUser.profilePic || "/avatar.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-xl font-semibold">{authUser.fullname}</h2>
          <p className="text-gray-600">{authUser.email}</p>
          <p className="text-gray-500">
            Branch: {authUser.branch===1 ? "ECE" : "CSE"}, year: {authUser.year}
          </p>
          <p className="text-gray-500">{authUser.college}</p>
        </div>
      </div>

      {/* CodeChef Section */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold">CodeChef</h3>
        <p>
          <strong>Rating:</strong> {authUser.chefRating}
        </p>
        <p>
          <strong>Stars:</strong> {authUser.chefStars}
        </p>
        <p>
          <strong>Problems Solved:</strong> {authUser.chefTotalProblemSolved}
        </p>
        <p>
          <strong>Contests:</strong> {authUser.chefContestCount}
        </p>
      </div>

      {/* CodeForces Section */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold">CodeForces</h3>
        <p>
          <strong>Rating:</strong> {authUser.forcesRating}
        </p>
        <p>
          <strong>Rank:</strong> {authUser.forcesRank}
        </p>
        <p>
          <strong>Max Rating:</strong> {authUser.forcesMaxRating}
        </p>
        <p>
          <strong>Max Rank:</strong> {authUser.forcesMaxRank}
        </p>
        <p>
          <strong>Contests:</strong> {authUser.forcesContestCount}
        </p>
        <p>
          <strong>Problems Solved:</strong> {authUser.forcesTotalProblemSolved}
        </p>
      </div>

      {/* LeetCode Section */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold">LeetCode</h3>
        <p>
          <strong>Rating:</strong> {authUser.leetRating}
        </p>
        <p>
          <strong>Global Rank:</strong> {authUser.leetGlobalRanking}
        </p>
        <p>
          <strong>Problems Solved:</strong> {authUser.totalSolvedLeetQuestions}{" "}
          / {authUser.totalLeetQuestions}
        </p>
        <p>
          <strong>Contests:</strong> {authUser.leetContestCount}
        </p>
        <p>
          <strong>Reputation:</strong> {authUser.leetReputation}
        </p>
        <p>
          <strong>Top Percentage:</strong> {authUser.leetTopPercentage}%
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
