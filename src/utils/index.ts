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

export async function fetchToken() {
  // Spotify takes base64 encoded string (binaryToAscii)
  const authString = btoa(
    `${process.env.API_SPOTIFY}:${process.env.SECRET_SPOTIFY}`
  );

  return $.ajax({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    data: {
      grant_type: 'client_credentials',
    },
    contentType: 'application/x-www-form-urlencoded',
    headers: {
      Authorization: `Basic ${authString}`,
    },
    success: (data, status) => {
      console.log('Spotify Auth: ', status);
    },
    error: (jqXHR, message, exception) => {
      console.log({ jqXHR, message, exception });
    },
  })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}
