import * as Spotify from '../models/spotify';
import { formatArtist, sleep } from '../utils';
import { Track } from './track';
import { Meta } from './meta';

export class Playlist {
  private $chartList = $('.chart-list') as JQuery;
  private scrollTop = 0;

  constructor(private playlistItems: Spotify.PlaylistItem[]) {}

  public async render() {
    // forEach only takes synchronous functions
    // for (let i = 0; i < this.playlistItems.length; i++) {
    //   const track = new Track(this.playlistItems[i], i + 1);
    //   const $track = track.$;
    //   this.$chartList.append($track);
    //   // transition class needs to be added in different render cycle
    //   await sleep(100);
    //   $track.addClass('slide');
    // }

    const tracks = this.playlistItems.map(
      (item, i) => new Track(item, i + 1).html
    );
    this.$chartList.html(tracks.join(''));

    await sleep(2000);
    this.$chartList.children().slice(0, 20).addClass('slide');

    // this.$chartList.children().on('click', async function () {
    //   console.log('click');
    //   const rank = this.dataset.rank as string;

    //   // remember scrollTop before setting it to 0 as we slide into meta section
    //   this.scrollTop = $('.app').scrollTop() as number;

    //   const meta = new Meta(+rank);
    //   meta.render();

    //   $('.chart').removeClass('show');
    //   $('.meta').addClass('show');
    // });
  }
}
