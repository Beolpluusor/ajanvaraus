import { useNavigate } from "react-router-dom";
import { format, addDays } from "date-fns";
import axios from "axios";
import { useEffect, useState } from "react";

// imports (pages)
import Calendar from "./Calendar";
import DaySchedule from "./Dayschedule";


export default function Home () {
    const [selectedDate, setSelectedDate] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [text, setText] = useState("");

    // logout
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    // text area handler
    const handleSubmit = async () => {
        const token = localStorage.getItem("token");

        await fetch("/api/bookings"), {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                date: selectedDate.toISOString().split("T")[0],
                title: text,
                description: text,
                start_time: "10:00:00", // temporal
                end_time: "11:00:00" // temporal
            })
        };

        setText("");
    };

    // date selected
    const handleDateSelect = async (date) => {
        setSelectedDate(date);

        const token = localStorage.getItem("token");
        const res = await fetch(`/api/bookings?date=${date.toISOString()}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

            // get reservois from backend
        const data = await res.json();
        setBookings(data);
    }


    return (
        <div>
            <div>
                Mainpage
                <br />
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="calendar">
                <Calendar onDateSelect={handleDateSelect}/>
                {selectedDate && (
                    <DaySchedule selectedDate={selectedDate} bookings={bookings} />
                )}
            </div>
            <div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your daily marking here..."
                />
            </div>

            
        </div>
    )
}