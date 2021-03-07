import './style.scss';
import { Playlist } from './components/playlist';
import { Meta } from './components/meta';

const playlist = new Playlist('200');
playlist.fetch().render();

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
  $meta.addClass('show');
});
