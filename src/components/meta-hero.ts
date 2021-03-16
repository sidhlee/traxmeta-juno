import * as Spotify from '../models/spotify';
import { formatArtist, formatDuration } from '../utils';

export class MetaHero {
  constructor(
    private trackRank: number,
    private track: Spotify.Track,
    private artist: Spotify.Artist
  ) {}

  public async render() {
    $('.meta').scrollTop(0);
    // hide before populating content

    $('.hero').css(
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
      src: this.track.album.images[0].url, // 640 * 640 px
      alt: this.track.name,
    });
  }

  private getCategoriesHtml(artist: Spotify.Artist, track: Spotify.Track) {
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

  private static getStatsHtml(track: Spotify.Track) {
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
