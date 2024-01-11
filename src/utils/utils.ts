export function formatTime(timeCreatedAt: string, timeUpdatedAt: string | null) {
    const currentTime = new Date();
    const targetTime = new Date(timeUpdatedAt || timeCreatedAt);
    const prefix = timeUpdatedAt ? 'Updated:' : 'Created:';

    const timeDiff = currentTime.getTime() - targetTime.getTime();
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    let timeShown: string;

    if (minutesDiff < 60) {
        timeShown = `${minutesDiff} minute${minutesDiff > 1 ? 's' : ''} ago`;
    } else if (hoursDiff < 24) {
        timeShown = `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} ago`;
    } else if (daysDiff <= 3) {
        timeShown = `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`;
    } else {
        const formattedDate = targetTime.toLocaleDateString('en-GB');
        timeShown = formattedDate;
    }

    return `${prefix} ${timeShown}`;
}
