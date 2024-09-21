const parseTimestamp = (timestamp: number): string => {
    const imageTime = Math.floor(timestamp / 1000); // Convert from milliseconds to seconds
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const diff = now - imageTime; // Difference in seconds

    if (diff < 3600) { // Less than an hour
        return `${Math.floor(diff / 60)}m`; // Minutes
    }

    if (diff < 86400) { // Less than a day
        return `${Math.floor(diff / 3600)}h`; // Hours
    }

    if (diff < 604800) { // Less than a week
        return `${Math.floor(diff / 86400)}d`; // Days
    }

    if (diff < 2630000) { // Less than a month (~30.5 days)
        return `${Math.floor(diff / 604800)}w`; // Weeks
    }

    if (diff < 31536000) { // Less than a year
        return `${Math.floor(diff / 2630000)}mo`; // Months
    }

    return `${Math.floor(diff / 31536000)}y`; // Years
};

export default parseTimestamp;
