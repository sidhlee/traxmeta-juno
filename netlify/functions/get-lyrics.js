const axios = require('axios').default;
const path = require('path');
const envConfig = require('dotenv').config({
  path: path.resolve(__dirname, '../../src/config/dev.env'),
});

Object.entries(envConfig.parsed || {}).forEach(
  ([key, value]) => (process.env[key] = value)
);

exports.handler = async function (event) {
  if (event.httpMethod !== 'GET') return;
  const { artistName, trackName } = event.queryStringParameters;

  const config = {
    timeout: 1000,
    method: 'get',
  };

  const query = `?apikey=${
    process.env.API_MUSIXMATCH
  }&q_artist=${encodeURIComponent(artistName)}&q_track=${encodeURIComponent(
    trackName
  )}`;

  const response = await axios({
    url: `http://api.musixmatch.com/ws/1.1/matcher.lyrics.get` + query,
    ...config,
  });

  const {
    message: {
      header: { status_code },
      body: {
        lyrics: { lyrics_body },
      },
    },
  } = response.data;

  const lyrics = lyrics_body.split(
    '******* This Lyrics is NOT for Commercial use *******'
  )[0];

  return {
    statusCode: status_code,
    body: JSON.stringify({ data: lyrics }),
  };
};
