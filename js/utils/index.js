export function formatArtist(track) {
    const artist = track.artists.reduce((result, artist, i) => {
        if (i > 0) {
            return (result += `, ${artist.name}`);
        }
        else {
            return (result += artist.name);
        }
    }, '');
    return artist;
}
export function formatDuration(ms) {
    const min = Math.floor(ms / 1000 / 60);
    const sec = Math.floor((ms / 1000) % 60);
    return `${min}min ${sec}sec`;
}
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
