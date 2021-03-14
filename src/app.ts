import './style.scss';
import { Playlist } from './components/playlist';
import { Meta } from './components/meta';
import * as Spotify from './models/spotify';
import {
  getPlayListItems,
  getMetaData,
  getToken,
  getHeroData,
} from './data/mock';

// TODO: slide between chart and meta with gesture (on mobile)
(async () => {
  const token = await getToken();
  const playlistItems: Spotify.PlaylistItem[] = await getPlayListItems(token);
  const playlist = new Playlist(playlistItems);
  playlist.render();

  const $chart = $('.chart');
  const $chartItems = $('.chart-item');
  const $meta = $('.meta');

  const topTrackMeta = new Meta(1);

  topTrackMeta.render();

  $chartItems.on('click', async function () {
    const rank = this.dataset.rank as string;

    const meta = new Meta(+rank);
    meta.render();

    $chart.removeClass('show');
    $meta.addClass('show');
  });

  $('.back-btn').on('click', function () {
    $chart.addClass('show');
    $meta.removeClass('show');
  });
})();

// TODO: fade components in once response is received
// TODO: slide in rank after meta fade-in
// TODO: animate (flip) chart-items on mount
