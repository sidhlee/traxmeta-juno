import './style.scss';
import { Playlist } from './components/playlist';
import { Meta } from './components/meta';

import * as Spotify from './models/spotify';

import { fetchToken } from './utils';

import playlistPageOne from './data/playlist-page1.json';
import playlistPageTwo from './data/playlist-page2.json';

const itemsOne = playlistPageOne.items as Spotify.PlaylistItem[];
const itemsTwo = playlistPageTwo.items as Spotify.PlaylistItem[];
const playlistItems = [...itemsOne, ...itemsTwo];

const playlist = new Playlist(playlistItems);
playlist.render();

const $chart = $('.chart');
const $chartItems = $('.chart-item');
const $meta = $('.meta');
const topTrack = $chartItems[0];

const { id, title, rank, artist } = topTrack.dataset as {
  id: string;
  title: string;
  rank: string;
  artist: string;
};

const topTrackMeta = new Meta(id, title, artist, +rank);

topTrackMeta.fetch().render();

$chartItems.on('click', function () {
  $chart.removeClass('show');
  $meta.addClass('show');
});

$('.back-btn').on('click', function () {
  $chart.addClass('show');
  $meta.removeClass('show');
});

// TODO: slide between chart and meta with gesture (on mobile)
(async () => {
  console.log(await fetchToken());
})();
