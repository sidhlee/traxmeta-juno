import { formatArtist, formatDuration } from '../utils.js';
export class MetaHero {
  constructor(trackRank, track, artist) {
    this.trackRank = trackRank;
    this.track = track;
    this.artist = artist;
  }
  async render() {
    $('.meta').scrollTop(0);
    // hide before populating content
    $('.meta__hero').css(
      'background-image',
      `url("${this.track.album.images[0].url}")`
    );
    // Text content
    $('.track-rank > span').text(this.trackRank);
    $('.track-title').text(this.track.name);
    $('.track-artist > span').text(formatArtist(this.track));
    $('.track-categories').html(
      this.getCategoriesHtml(this.artist, this.track)
    );
    $('.track-stats').html(MetaHero.getStatsHtml(this.track));
    // Cover image
    $('.track-info__cover > img').attr({
      src: this.track.album.images[0].url,
      alt: this.track.name,
    });
  }
  getCategoriesHtml(artist, track) {
    const genres = artist.genres;
    const categories = [...genres];
    let markup = categories
      .map((c) => {
        return `<span class="category pill">${c}</span>`;
      })
      .join('');
    if (this.track.explicit) {
      markup += `<span class="category pill danger">explicit</span>`;
    }
    return markup;
  }
  static getStatsHtml(track) {
    const {
      album: { release_date },
      duration_ms,
      popularity,
    } = track;
    const stats = {
      release: release_date,
      duration: formatDuration(duration_ms),
      popularity: popularity + '%',
    };
    const markup = Object.entries(stats)
      .map(
        ([statName, value]) =>
          `<li class="track-stat"><span class="stat-name">${statName}</span class="stat-value">: <spa>${value}<span></li>`
      )
      .join('');
    return markup;
  }
}
