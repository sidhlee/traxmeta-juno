import { getPlayListItems } from '../data.js';
import { Track } from './track.js';
export class Playlist {
  constructor(token) {
    this.token = token;
    this.$chartList = $('.chart-list');
    this.playlistItems = [];
  }
  async render() {
    await this.loadPlaylistItems();
    const tracks = this.playlistItems.map(
      (item, i) => new Track(item, i + 1).html
    );
    this.$chartList.html(tracks.join(''));
    // invoke animation only on first 20 chart item (only animate visible components)
    this.$chartList.children().slice(0, 20).addClass('slide');
  }
  async loadPlaylistItems() {
    this.playlistItems = await getPlayListItems(this.token);
  }
}
