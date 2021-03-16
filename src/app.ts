import './style.scss';
import { Playlist } from './components/playlist';
import { Meta } from './components/meta';
import * as Spotify from './models/spotify';
import { getPlayListItems, getToken } from './data';

const $chart = $('.chart');
const $chartList = $('.chart-list');
const $meta = $('.meta');
const $app = $('.app');

// TODO: slide between chart and meta with gesture (on mobile)
(async () => {
  // load token and render top 200
  const token = await getToken();
  const playlistItems: Spotify.PlaylistItem[] = await getPlayListItems(token);
  const playlist = new Playlist(playlistItems);
  await playlist.render();
  $('.spinner').hide();
  $chart.addClass('show');

  const topTrackMeta = new Meta(1, token);
  await topTrackMeta.render();
  $meta.addClass('show');

  let top = 0;

  $chartList.children().on('click', async function () {
    $meta.removeClass('show');
    const rank = this.dataset.rank as string;

    // remember scrollTop before setting it to 0 as we slide into meta section
    top = $app.scrollTop() as number;
    $chart.removeClass('show');
    const meta = new Meta(+rank, token);
    await meta.render();
    $meta.addClass('show');
  });

  $('.back-btn').on('click', function () {
    // Set the scrollTop back to where it was before sliding into meta section
    $app.scrollTop(top);
    $chart.addClass('show');
    $meta.removeClass('show');
  });
})();
