import { Spotify } from 'models';
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
