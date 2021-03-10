import './style.scss';
import { Playlist } from './components/playlist';
import { Meta } from './components/meta';
import * as Spotify from './models/spotify';
import { getPlayListItems, getMetaData, getToken } from './data';
import { chdir } from 'process';

// TODO: slide between chart and meta with gesture (on mobile)
(async () => {
  const token = await getToken();
  const playlistItems: Spotify.PlaylistItem[] = await getPlayListItems(token);
  const playlist = new Playlist(playlistItems);
  playlist.render();

  const $chart = $('.chart');
  const $chartItems = $('.chart-item');
  const $meta = $('.meta');

  const topTrackMetaData = await getMetaData(token, 1);
  console.log(topTrackMetaData);

  const topTrackMeta = new Meta(topTrackMetaData);

  topTrackMeta.render();

  $chartItems.on('click', async function () {
    const metaData = await getMetaData(token, +this.dataset.rank! as number);
    const meta = new Meta(metaData);
    meta.render();

    $chart.removeClass('show');
    $meta.addClass('show');
  });

  $('.back-btn').on('click', function () {
    $chart.addClass('show');
    $meta.removeClass('show');
  });
})();
