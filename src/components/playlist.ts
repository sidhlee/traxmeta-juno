import { getPlayListItems } from '../data';
import * as Spotify from '../models/spotify';
import { Track } from './track';

export class Playlist {
  private $chartList = $('.chart-list') as JQuery;
  private playlistItems: Spotify.PlaylistItem[] = [];

  constructor(private token: string) {}

  public async render() {
    await this.loadPlaylistItems();

    const tracks = this.playlistItems.map(
      (item, i) => new Track(item, i + 1).html
    );
    this.$chartList.html(tracks.join(''));
    // invoke animation only on first 20 chart item (only animate visible components)
    this.$chartList.children().slice(0, 20).addClass('slide');
  }

  private async loadPlaylistItems() {
    this.playlistItems = await getPlayListItems(this.token);
  }
}
