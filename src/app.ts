import './style.scss';
import { Playlist } from './components/playlist';
import { Meta } from './components/meta';
import * as Spotify from './models/spotify';
import { request } from './utils';

// TODO: slide between chart and meta with gesture (on mobile)
(async () => {
  const { access_token: token } = await request({
    url: '/.netlify/functions/get-token',
    method: 'get',
  });

  const playlistItems: Spotify.PlaylistItem[] = await request({
    url: '/.netlify/functions/get-playlist',
    method: 'post',
    data: {
      token,
    },
  });

  const playlist = new Playlist(playlistItems);
  playlist.render();

  const $chart = $('.chart');
  const $chartItems = $('.chart-item');
  const $meta = $('.meta');
  const topTrack = $chartItems[0];

  const topTrackMeta = new Meta(id, title, artist, +rank);

  topTrackMeta.render();

  $chartItems.on('click', function () {
    $chart.removeClass('show');
    $meta.addClass('show');
  });

  $('.back-btn').on('click', function () {
    $chart.addClass('show');
    $meta.removeClass('show');
  });
})();
