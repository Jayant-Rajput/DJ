import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { type:String, required: true },
    email: { type:String, required: true, unique:true },
    password: { type:String, required: function(){ return this.authProvider === "local" } },
    branch: { type:String },
    year: { type:String },
    college: { type:String },
    codechefId: { type:String, required: true },
    codeforcesId: { type:String, required: true },
    leetcodeId: { type:String, required: true },
    profilePic: { type: String},

    totalLeetQuestions: { type: Number },
    easyLeetQuestions: { type: Number },
    mediumLeetQuestions: { type: Number },
    hardLeetQuestions: { type: Number },
    totalSolvedLeetQuestions: { type: Number },
    easySolvedLeetQuestions: { type: Number },
    mediumSolvedLeetQuestions: { type: Number },
    hardSolvedLeetQuestions: { type: Number },
    leetReputation: { type: Number },
    leetRanking: { type: Number },
    leetContestCount: { type: Number },
    leetRating: { type: Number },
    leetGlobalRanking: { type: Number },
    leetTotalParticipants: { type: Number },
    leetTopPercentage: { type: Number },
    // leetBadges: { type: Number },         //handle it later

    forcesRating: { type: Number },
    forcesRank: { type: String },
    forcesMaxRating: { type: Number },
    forcesMaxRank: { type: String },
    forcesContestCount: { type: Number},
    forcesTotalProblemSolved: { type: Number },
    forcesTotalProblemsolvedByRating: { 
        type: Map, 
        of: Number, 
        default: {} 
    },

    chefRating: { type: Number },
    chefStars: { type: String },
    chefTotalProblemSolved: { type: Number },
    chefContestCount: { type: Number },
    authProvider: {type: String, enum: ["local", "google", "otp"], required: true},
    otp: {type: Number},
    bookmarkedContests: [ {type: mongoose.Schema.Types.ObjectId , ref: 'Contest'} ],
}, {timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;



