import { LastFm, Spotify } from 'models';

export async function request(ajaxSettings: JQueryAjaxSettings) {
  const response = await $.ajax(ajaxSettings);
  const { data } = JSON.parse(response);
  return data;
}

export async function getToken() {
  const response = await request({
    url: '/.netlify/functions/get-token',
    method: 'get',
  });

  return response.access_token;
}

export async function getPlayListItems(token: string) {
  const playlistItems: Spotify.PlaylistItem[] = await request({
    url: '/.netlify/functions/get-playlist',
    method: 'post',
    data: {
      token,
    },
  });

  return playlistItems;
}

export async function getHeroData(token: string, trackRank: number) {
  const { track_id, artist_id } = $('.chart-item')[trackRank - 1].dataset;
  const data = {
    token,
    spotifyArtistId: artist_id,
    spotifyTrackId: track_id,
  };

  const {
    track,
    artist,
  }: { track: Spotify.Track; artist: Spotify.Artist } = await request({
    url: '/.netlify/functions/get-meta-hero',
    method: 'post',
    data,
  });

  return {
    track,
    artist,
    trackRank,
  };
}

export async function getLyrics(artistName: string, trackName: string) {
  const data = {
    artistName,
    trackName,
  };
  console.log('getLyrics');
  try {
    const lyrics: string = await request({
      url: '/.netlify/functions/get-lyrics',
      method: 'post',
      data,
    });
    console.log('aaa', lyrics);

    return lyrics;
  } catch (err) {
    return ''; // return empty string on Error response
  }
}

export async function getLastFmArtist(artistName: string) {
  const name = artistName.split(',')[0];
  const data = { artistName: name };

  const lastFmArtist: LastFm.Artist = await request({
    url: '/.netlify/functions/get-lastfm-artist',
    method: 'post',
    data,
  });

  return lastFmArtist;
}
