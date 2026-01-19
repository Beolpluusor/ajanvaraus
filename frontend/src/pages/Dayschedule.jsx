import { useEffect, useState } from "react";
import { generateTimeSlots } from "../utils/timeSlots";
import { format } from "date-fns";

export default function DaySchedule({ selectedDate, bookings }) {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        if (!selectedDate) return;

        const start = new Date(selectedDate);
        start.setHours(8, 0, 0, 0);

        const end = new Date(selectedDate);
        end.setHours(16, 0, 0, 0);
        
        const generated = generateTimeSlots(start, end, 30);
        setSlots(generated);
    }, [selectedDate]);

    const isBooked = (slot) => {
        return bookings.some(
            (b) => new Date(b.time).getTime() === slot.getTime()
        );
    };

    return (
        <div className="day-schedule">
            <h3>{format(selectedDate, "dd.MM.yyyy")}</h3>

            <div className="slots">
                {slots.map((slot, i) => {
                    <div
                    key={i}
                    className={`slot ${isBooked(slot)} ? "booked" : "free"`}
                    >
                        {format(slot, "HH:mm")}
                    </div>
                })}
            </div>
        </div>
    )
}
