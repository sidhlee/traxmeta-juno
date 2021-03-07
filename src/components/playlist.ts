import playlistPageOne from '../data/playlist-page1.json';
import playlistPageTwo from '../data/playlist-page2.json';
import * as Spotify from '../models/spotify';
import { getArtist } from './helpers';

export class Playlist {
  public playlistItems = [] as Spotify.PlaylistItem[];
  private $chartList = $('.chart-list') as JQuery;
  constructor(private id: string) {}

  public fetch() {
    // TODO: replace with real api call
    const itemsOne = playlistPageOne.items as Spotify.PlaylistItem[];
    const itemsTwo = playlistPageTwo.items as Spotify.PlaylistItem[];
    this.playlistItems = this.playlistItems.concat(itemsOne, itemsTwo);
    return this;
  }
  public render() {
    const tracks = this.getTracks();
    this.$chartList.html(tracks.join(''));
  }

  private getTracks() {
    const tracks = this.playlistItems.map((item, i) => {
      const {
        track,
        track: { album },
      } = item;
      const src = album.images[2].url; // 64*64px
      const alt = track.name;
      const rank = i + 1;
      const title = track.name;
      const artist = getArtist(item.track);
      return `
        <li class="chart-item" data-id="${track.id}" data-title="${title}" data-rank="${rank}" data-artist="${artist}">
          <div class="chart-item__cover"><img src="${src}" alt="${alt}"></div>
          <div class="chart-item__text">
            <span class="chart-item__text--rank">${rank}</span>
            <div class="chart-item__text-wrapper">
              <span class="chart-item__text--title">${title}</span>
              <span class="chart-item__text--artist">by ${artist}</span>          
            </div>
          </div>
        </li>
      `;
    });

    return tracks;
  }
}
