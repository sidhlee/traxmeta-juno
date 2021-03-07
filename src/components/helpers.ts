import * as Spotify from '../models/spotify';

export function getArtist(track: Spotify.Track) {
  const artist = track.artists.reduce((result, artist, i) => {
    if (i > 0) {
      return (result += `, ${artist.name}`);
    } else {
      return (result += artist.name);
    }
  }, '');

  return artist;
}

export function formatDuration(ms: number) {
  const min = Math.floor(ms / 1000 / 60);
  const sec = Math.floor((ms / 1000) % 60);
  return `${min}min ${sec}sec`;
}
