import React, { useEffect, useState } from "react";
import { useContestStore } from "../stores/useContestStore";

const calendarOptions = ["Google", "Outlook", "Apple"];

export const ContestCard = ({
    title,
    platform,
    url,
    start_time,
    raw_start_time,
    raw_duration,
    reg_participants,
    statusArray,
    contest
}) => {
    const [calendarDropdown, setCalendarDropdown] = useState(false);
    const [status, setStatus] = useState("");
    const [countdownSeconds, setCountdownSeconds] = useState(0);
    const [bookmark, setBookmark] = useState(false);  
    
    const { bookmarkContest } = useContestStore();

    useEffect(() => {
        (bookmark) ? bookmarkContest.push(contest): bookmarkContest.includes(contest) ? bookmarkContest = bookmarkContest.filter(item => item!==contest) : "";
    }, [bookmark]);

    const bgColor = {
        upcoming: "bg-green-500 text-white",
        ongoing: "bg-orange-500 text-white",
        completed: "bg-red-500 text-white"
    };

    const contestStartTime = new Date(raw_start_time);
    const contestEndTime = new Date(raw_start_time);
    contestEndTime.setSeconds(contestStartTime.getSeconds() + raw_duration);

    const formatCountdown = (seconds) => {
        if (seconds <= 0) return "00:00";
    
        const days = Math.floor(seconds / (24 * 3600));
        const hrs = Math.floor((seconds % (24 * 3600)) / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
    
        const parts = [];
        if (days > 0) parts.push(`${days} days`);
        if (hrs > 0) parts.push(`${hrs} hrs`);
        if (mins > 0) parts.push(`${mins} minutes`);
        if (secs > 0) parts.push(`${secs} seconds`);
    
        return parts.join(", ");
    };

    console.log(statusArray);   
    

    useEffect(() => {
        const now = Date.now();
        if (contestStartTime > now) {
            setStatus("Upcoming");
            setCountdownSeconds(((contestStartTime - now) / 1000).toFixed());
        } else if (contestStartTime <= now && now <= contestEndTime) {
            setStatus("Ongoing");
            setCountdownSeconds(((contestEndTime - now) / 1000).toFixed());
        } else {
            setStatus("Completed");
            setCountdownSeconds(0);
        }

        const countdownTimer = setInterval(() => {
            const now = new Date();
            if (((contestStartTime - now) / 1000).toFixed() == 5 * 60) {
                new Notification(`${title} about to start in 5 minutes.`);
            }
            if (contestStartTime > now) {
                setStatus("Upcoming");
            } else if (contestStartTime <= now && now <= contestEndTime) {
                setStatus("Ongoing");
            } else {
                setStatus("Completed");
                clearInterval(countdownTimer);
            }
            setCountdownSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(countdownTimer);
    }, [status, contestStartTime, contestEndTime, title]);

    const handleAddToCalendar = (calendarType) => {
        const startDate = contestStartTime.toISOString().replace(/-|:|\.\d\d\d/g, "");
        const endDate = contestEndTime.toISOString().replace(/-|:|\.\d\d\d/g, "");

        let calendarUrl;
        switch (calendarType) {
            case "google":
                calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
                    platform + " - " + title
                )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
                    "Find more info at " + url
                )}&location=Online&sf=true&output=xml`;
                break;
            case "outlook":
                calendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
                    platform + " - " + title
                )}&startdt=${contestStartTime.toISOString()}&enddt=${contestEndTime.toISOString()}&body=${encodeURIComponent(
                    "Find more info at " + url
                )}&location=Online`;
                break;
            case "apple":
                const icsContent = `
                    BEGIN:VCALENDAR
                    VERSION:2.0
                    BEGIN:VEVENT
                    DTSTART:${startDate}
                    DTEND:${endDate}
                    SUMMARY:${platform + " - " + title}
                    DESCRIPTION:Find more info at ${url}
                    LOCATION:Online
                    END:VEVENT
                    END:VCALENDAR
                `.trim();
                const blob = new Blob([icsContent], { type: "text/calendar" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = `${platform} contest ${title}.ics`;
                link.click();
                return;
            default:
                return;
        }
        window.open(calendarUrl, "_blank");
    };

    return (
        (
            (statusArray.length===0 || statusArray.includes(status)) && (
                <div className="w-full max-w-3xl mx-auto bg-black text-white border border-white rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold">{platform}</div>
                <div className={`px-2 py-1 rounded-md text-sm font-semibold ${bgColor[status.toLowerCase()]}`}>{status}</div>
            </div>
            <div className="text-xl font-bold mb-2">{title}</div>
            <div className="flex items-center space-x-4 text-sm mb-2">
                <div className="bg-gray-700 px-2 py-1 rounded-md">{start_time}</div>
                {status !== "Completed" && (
                    <div className="bg-gray-700 px-2 py-1 rounded-md font-mono">{formatCountdown(Number(countdownSeconds))}</div>
                )}
            </div>
            <button
                onClick={() => setCalendarDropdown(!calendarDropdown)}
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-1 px-3 rounded-md border border-gray-500"
            >
                Add to Calendar
            </button>
            {calendarDropdown && (
                <div className="mt-2 bg-gray-800 rounded-lg border border-gray-600 shadow-md overflow-hidden">
                    {calendarOptions.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleAddToCalendar(option.toLowerCase())}
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-center"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}

            <div onClick={() => setBookmark(!bookmark)}>Bookmark</div>
                </div>
            )
        )
        
    );
};