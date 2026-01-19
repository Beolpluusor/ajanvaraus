
import { useState } from "react";
import { format, 
        startOfMonth, 
        endOfMonth, 
        startOfWeek, 
        endOfWeek, 
        addDays, 
        isSameMonth, 
        isSameDay } from "date-fns";


export default function Calendar ({ onDateSelect }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const weekStart = startOfWeek(monthStart, { weekStartsOn: 1 }); //monday
    const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = [];
    let day = weekStart;

    while (day <= weekEnd) {
        days.push(day);
        day = addDays(day, 1);
    }
    const nextMonth = () => setCurrentDate(addDays(monthEnd, 1));
    const prevMonth = () => setCurrentDate(addDays(monthStart, -1));
    return (

        <div className="calendar">
            <div className="header">
                <button onClick={prevMonth}>prev month</button>
                <h2>{format(currentDate, "MMMM yyyy")}</h2>
                <button onClick={nextMonth}>next month</button>
            </div>

            <div className="weekdays">
                {["Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
                    <div key={d} className="weekday">{d}</div>
                ))}
            </div>

            <div className="grid">
                {days.map((d, i) => (
                    <div
                    key={i}
                    className={`day
                        ${isSameMonth(d, monthStart) ? "disabled" : ""}
                        ${isSameDay(d, new Date()) ? "today" : ""}
                    `}
                    onClick={() => onDateSelect(d)}
                    >
                        {format(d, "d")}
                    </div>
                ))}
            </div>
        </div>
    )
}