import axios from "axios";

export const codechefContestList = async () => {
    const response = await axios.get("https://www.codechef.com/api/list/contests/all");
    const presentContests = response.data.present_contests;
    const futureContests = response.data.future_contests;
    const pastContests = response.data.past_contests;
    const contests = [];
  
    if (response.status === 200) {
      const contests_data = [...presentContests, ...futureContests, ...pastContests];
      contests_data.forEach((data) => {
        const title = data["contest_name"];
        const url = `https://www.codechef.com/${data["contest_code"]}`;
        const start_date = data["contest_start_date"];
        const startDateUTC = new Date(Date.parse(start_date + " UTC"));
        const durationInMinutes = data["contest_duration"];
        const duration_hours = Math.floor(durationInMinutes / 60);
        const duration_minutes = durationInMinutes % 60;
        const duration = `${duration_hours} hours ${duration_minutes} minutes`;
  
        contests.push({
          title,
          platform: "CodeChef",
          url,
          start_time: start_date,
          duration,
          reg_participants: data["distinct_users"],
          raw_start_time: startDateUTC,
          raw_duration: durationInMinutes * 60,
        });
      });
    }
    return contests;
  };
  