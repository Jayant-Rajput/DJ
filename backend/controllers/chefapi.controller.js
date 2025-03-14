import axios from "axios";

export const codechefContestList = async () => {
    const response = await axios.get("https://www.codechef.com/api/list/contests/all");
    const presentContests = response.data.present_contests;
    const futureContests = response.data.future_contests;
    const pastContests = response.data.past_contests;
    // console.log(response.status);
    const contests = [];
    if(response.status==200){
        const contests_data = [...presentContests, ...futureContests, ...pastContests];
        // console.log("HOla");
        // console.log(contests_data);
        contests_data.forEach(data => {
            const title = data["contest_name"];
            const url = `https://www.codechef.com/${data["contest_code"]}`;
            const start_date = data["contest_start_date"];
            const duration_hours = Math.floor(data["contest_duration"]/60);
            const duration_minutes = data["contest_duration"]%60;
            const duration = `${duration_hours} hours ${duration_minutes} minutes`;
            const reg_participants = data["distinct_users"];

            contests.push({
                "title": title,
                "platform": "codechef",
                "url": url,
                "start_time": start_date,
                "duration": duration,
                "reg_participants": reg_participants,
            })
        });
    }
    return contests;
}