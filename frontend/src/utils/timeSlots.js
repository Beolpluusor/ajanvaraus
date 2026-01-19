// this function makes slots like: 08:00 -> 15:00 every 30 minutes
export function generateTimeSlots(start, end, intervalMinutes) {
    const slots = [];
    let current = new Date(start);

    while (current < end) {
        slots.push(new Date(current));
        current = new Date(current.getTime() + intervalMinutes * 60000);
    }
    return slots;
}