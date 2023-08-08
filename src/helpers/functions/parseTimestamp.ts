const parseTimestamp = (timestamp: number): string => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;

    if (diff < 3600) {
        return `${Math.floor(diff / 60)}m`
    }

    if (diff < 86400) {
        return `${Math.floor(diff / 3600)}h`
    }

    if (diff < 604800) {
        return `${Math.floor(diff / 86400)}d`
    }

    if (diff < 2630000) {
        return `${Math.floor(diff / 604800)}w`
    }

    if (diff < 31536000) {
        return `${Math.floor(diff / 2630000)}m`
    }

    return `${Math.floor(diff / 31536000)}y`;
}

export default parseTimestamp;