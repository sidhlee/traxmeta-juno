import { formatArtist } from '../utils/index.js';
export class Track {
  constructor(playlistItem, rank) {
    const {
      track: { album, name, artists, id },
    } = playlistItem;
    this.src = album.images[2].url; // 64*64px
    this.alt = name;
    this.rank = rank;
    this.title = name;
    /** Spotify track id */
    this.id = id;
    this.artist = formatArtist(playlistItem.track);
    this.artistId = artists[0].id;
    this.html = `
      <li class="chart-item" data-track_id="${this.id}" data-artist_id="${this.artistId}" data-title="${this.title}" data-rank="${this.rank}" data-artist_name="${this.artist}">          
        <div class="chart-item__cover"><img src="${this.src}" alt="${this.alt}"></div>
        <div class="chart-item__text">
          <span class="chart-item__text--rank">${this.rank}</span>
          <div class="chart-item__text-wrapper">
            <span class="chart-item__text--title">${this.title}</span>
            <span class="chart-item__text--artist">by ${this.artist}</span>          
          </div>
        </div>            
      </li>
    `;
    this.$ = $(this.html);
  }
}
