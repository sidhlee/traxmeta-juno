import * as Spotify from '../models/spotify';
import { sleep } from '../utils';
import { Track } from './track';

export class Playlist {
  private $chartList = $('.chart-list') as JQuery;

  constructor(private playlistItems: Spotify.PlaylistItem[]) {}

  public async render() {
    const tracks = this.playlistItems.map(
      (item, i) => new Track(item, i + 1).html
    );
    this.$chartList.html(tracks.join(''));
    // invoke animation only on first 20 chart item (only animate visible components)
    this.$chartList.children().slice(0, 20).addClass('slide');
  }
}
