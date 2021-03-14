import { LastFm, Spotify } from 'models';
import playlistOne from './playlist-page1.json';
import playlistTwo from './playlist-page2.json';
import track from './track.json';
import lyrics from './lyrics.json';
import lastFmArtist from './artist.lastfm.json';
import artist from './artist.json';

export async function request(ajaxSettings: JQueryAjaxSettings) {
  const response = await $.ajax(ajaxSettings);
  const { data } = JSON.parse(response);
  return data;
}

export async function getToken() {
  return 'token' as string;
}

export async function getPlayListItems(token: string) {
  const playlistItems = [...playlistOne.items, ...playlistTwo.items];

  return playlistItems;
}

export async function getMetaData(token: string, trackRank: number) {}

export async function getHeroData(token: string, trackRank: number) {
  return {
    track,
    artist,
    trackRank,
  } as {
    track: Spotify.Track;
    artist: Spotify.Artist;
    trackRank: number;
  };
}

export async function getLyrics(artistName: string, trackName: string) {
  return lyrics.lyrics;
}

export async function getLastFmArtist(artistName: string) {
  return (lastFmArtist.artist as unknown) as LastFm.Artist;
}
