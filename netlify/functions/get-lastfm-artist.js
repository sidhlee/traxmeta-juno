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
  const { artistName } = event.queryStringParameters;

  const config = {
    timeout: 5000,
    method: 'get',
  };

  const response = await axios({
    url: `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
      artistName
    )}&api_key=${process.env.API_LASTFM}&format=json`,
    ...config,
  });

  const artistLastFm = response.data.artist;

  return {
    statusCode: 200,
    // remove circular reference to be able to converted into JSON
    body: JSON.stringify({ data: artistLastFm }),
  };
};
