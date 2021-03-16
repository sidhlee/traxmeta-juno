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

  try {
    const { body } = event;
    const { token } = qs.parse(body);

    const [{ data: first100 }, { data: second100 }] = await Promise.all([
      axios({
        url: process.env.URL_PLAYLIST_SPOTIFY,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios({
        url: process.env.URL_PLAYLIST_SPOTIFY + '?offset=100&limit=100',
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    const playlist = first100.items.concat(second100.items);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: playlist }),
    };
  } catch (err) {
    console.log(err);
  }
};
