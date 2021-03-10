const axios = require('axios').default;
const qs = require('qs');

const path = require('path');
const envConfig = require('dotenv').config({
  path: path.resolve(__dirname, '../../src/config/dev.env'),
});

Object.entries(envConfig.parsed || {}).forEach(
  ([key, value]) => (process.env[key] = value)
);

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') return;

  const { body } = event;
  const {
    spotifyArtistId,
    spotifyTrackId,
    token,
    artistName,
    trackName,
  } = qs.parse(body);

  axios
    .all([
      axios({
        url: 'https://api.spotify.com/v1/tracks/' + spotifyTrackId,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios({
        url: 'https://api.spotify.com/v1/artists/' + spotifyArtistId,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios({
        url: `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
          artistName
        )}&api_key=${process.env.API_LASTFM}&format=json`,
        method: 'get',
      }),
      axios({
        url: `https://api.lyrics.ovh/v1/${encodeURIComponent(
          artistName
        )}/${encodeURIComponent(trackName)}`,
        method: 'get',
      }),
    ])
    .then(
      axios.spread((track, artist, artistLastFm, lyrics) => {
        return {
          statusCode: 200,
          body: JSON.stringify({
            data: {
              track,
              artist,
              artistLastFm,
              lyrics: lyrics.lyrics,
            },
          }),
        };
      })
    ).catch(err) {
      console.log(err)
    }
};
