import * as Spotify from '../models/spotify';
import { getArtist } from '../utils';

export class Playlist {
  private $chartList = $('.chart-list') as JQuery;
  constructor(private playlistItems: Spotify.PlaylistItem[]) {}

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
      const artistId = track.artists[0].id;
      return `
        <li class="chart-item" data-track_id="${track.id}" data-artist_id="${artistId}" data-title="${title}" data-rank="${rank}" data-artist_name="${artist}">
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
