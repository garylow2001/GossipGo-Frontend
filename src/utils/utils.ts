export const threadCategories = ["Academic", "News", "Technology", "Entertainment", "Hot Takes"]

export function formatTime(timeCreatedAt: string, timeUpdatedAt: string) {
    const currentTime = new Date();
    let targetTime;
    let prefix;

    if (timeUpdatedAt !== timeCreatedAt) {
        // If the timeUpdatedAt is different from timeCreatedAt, then the post has been updated
        // Else the post has been created and not updated
        targetTime = new Date(timeUpdatedAt);
        prefix = 'Updated:';
    } else {
        targetTime = new Date(timeCreatedAt);
        prefix = 'Created:';
    }

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

export function convertToSlug(text: string) {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}