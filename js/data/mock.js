import playlistOne from './playlist-page1.json';
import playlistTwo from './playlist-page2.json';
import track from './track.json';
import lyrics from './lyrics.json';
import lastFmArtist from './artist.lastfm.json';
import artist from './artist.json';
export async function request(ajaxSettings) {
    const response = await $.ajax(ajaxSettings);
    const { data } = JSON.parse(response);
    return data;
}
export async function getToken() {
    return 'token';
}
export async function getPlayListItems(token) {
    const playlistItems = [...playlistOne.items, ...playlistTwo.items];
    return playlistItems;
}
export async function getMetaData(token, trackRank) { }
export async function getHeroData(token, trackRank) {
    return {
        track,
        artist,
        trackRank,
    };
}
export async function getLyrics(artistName, trackName) {
    return lyrics.lyrics;
}
export async function getLastFmArtist(artistName) {
    return lastFmArtist.artist;
}
