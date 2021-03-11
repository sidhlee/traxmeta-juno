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
  const { artistName, trackName } = qs.parse(body);

  const config = {
    timeout: 5000,
    method: 'get',
  };

  const response = await axios({
    url: `https://api.lyrics.ovh/v1/${encodeURIComponent(
      artistName
    )}/${encodeURIComponent(trackName)}`,
    ...config,
  });

  const { lyrics } = response;

  return {
    statusCode: 200,
    // remove circular reference to be able to converted into JSON
    body: JSON.stringify({ data: lyrics }),
  };
};
