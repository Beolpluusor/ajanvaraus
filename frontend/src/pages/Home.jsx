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

    // logout
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

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

            
        </div>
    )
}