const axios = require('axios').default;
const qs = require('qs');

const path = require('path');
const envConfig = require('dotenv').config({
  path: path.resolve(__dirname, '../../src/config/dev.env'),
});

Object.entries(envConfig.parsed || {}).forEach(
  ([key, value]) => (process.env[key] = value)
);

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return;

  const { body } = event;
  const {
    spotifyArtistId,
    spotifyTrackId,
    token,
    artistName,
    trackName,
  } = qs.parse(body);

  console.log(qs.parse(body));

  const config = {
    timeout: 1000,
    method: 'get',
  };

  const meta = await Promise.allSettled([
    axios({
      url: 'https://api.spotify.com/v1/tracks/' + spotifyTrackId,
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    axios({
      url: 'https://api.spotify.com/v1/artists/' + spotifyArtistId,
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    axios({
      url: `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
        artistName
      )}&api_key=${process.env.API_LASTFM}&format=json`,
      ...config,
    }),
    axios({
      url: `https://api.lyrics.ovh/v1/${encodeURIComponent(
        artistName
      )}/${encodeURIComponent(trackName)}`,
      ...config,
    }),
  ]).then((values) => {
    const settledValues = values.map((outcome) => {
      if (outcome.status === 'fulfilled') {
        return outcome.value.data;
      } else {
        return '';
      }
    });

    const [track, artist, artistLastFm, lyrics] = settledValues;

    const meta = {
      track,
      artist,
      artistLastFm: artistLastFm.artist,
      lyrics,
    };

    return meta;
  });

  return {
    statusCode: 200,
    // remove circular reference to be able to converted into JSON
    body: JSON.stringify({ data: meta }),
  };
};
