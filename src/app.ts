import './style.scss';
import { Playlist } from './components/playlist';

const playlist = new Playlist('200');
playlist.fetch();
playlist.render();

const $chartItems = $('.chart-item');
const $meta = $('.meta');

$chartItems.on('click', function () {
  $meta.addClass('show');
});
