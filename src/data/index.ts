import { LastFm, Spotify } from 'models';
import { MetaData } from '../components/meta';

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

export async function getMetaData(token: string, trackRank: number) {
  const { track_id, artist_id, title, rank, artist_name } = $('.chart-item')[
    trackRank - 1
  ].dataset;

  const data = {
    token,
    spotifyArtistId: artist_id,
    spotifyTrackId: track_id,
    artistName: artist_name,
    trackName: title,
  };

  const response = await request({
    url: '/.netlify/functions/get-meta',
    method: 'post',
    data,
  });

  return {
    ...response,
    trackRank,
  } as MetaData;
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

  const lyrics: string = await request({
    url: '/.netlify/functions/get-lyrics',
    method: 'post',
    data,
  });

  return lyrics;
}

export async function getLastFmArtist(artistName: string) {
  const data = { artistName };

  const lastFmArtist: LastFm.Artist = await request({
    url: '/.netlify/functions/get-lastfm-artist',
    method: 'post',
    data,
  });
  console.log(lastFmArtist);

  return lastFmArtist;
}
