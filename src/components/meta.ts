import * as Spotify from '../models/spotify';
import * as LastFm from '../models/last-fm';
import { getArtist, formatDuration } from './helpers';
import track from '../data/track.json';
import lyrics from '../data/lyrics.json';
import artist from '../data/artist.json';
import artistLastFm from '../data/artist.lastfm.json';

export class Meta {
  private track = {} as Spotify.Track;
  private lyrics = '';
  private artist = {} as Spotify.Artist;
  private artistLastFm = {} as LastFm.Artist;
  /**
   * Creates meta information for given track.
   * @param id spotify track id
   * @param trackName
   * @param artist
   */
  constructor(
    private id: string,
    private trackName: string,
    private artistName: string,
    private rank: number
  ) {}

  public fetch() {
    this.track = track as Spotify.Track;
    this.lyrics = lyrics.lyrics;
    this.artist = artist as Spotify.Artist;
    this.artistLastFm = (artistLastFm.artist as unknown) as LastFm.Artist;
    return this;
  }

  public render() {
    $('.meta-header').removeClass('hidden');

    this.renderHero();
    this.renderLyrics();
    this.renderBio();
    this.renderTags();
  }

  private renderHero() {
    // Text content
    $('.track-rank > span').text(this.rank);
    $('.track-title').text(this.track.name);
    $('.track-artist > span').text(getArtist(this.track));
    $('.track-categories').html(this.getCategoriesHtml());
    $('.track-stats').html(this.getStatsHtml());

    // Cover image
    $('.track-info__cover > img').attr({
      src: track.album.images[0].url, // 640 * 640 px
      alt: track.name,
    });

    $('.meta__hero').css(
      'background-image',
      `url("${this.track.album.images[0].url}")`
    );
  }

  private getCategoriesHtml() {
    const genres = this.artist.genres;
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

  private getStatsHtml() {
    const {
      album: { release_date },
      duration_ms,
      popularity,
    } = this.track;

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

  private renderLyrics() {
    // replace new line with <br> tag
    const lyrics = this.lyrics; //.replace(/\\n/g, '</br>');

    $('.lyrics-text').html(this.lyrics);
    // set background image with artist image
    $('.meta__lyrics').css(
      'background-image',
      `url("${this.artist.images[0].url}")`
    );
  }

  private renderBio() {
    $('.artist-image > img').attr({
      src: this.artist.images[0].url,
      alt: this.artist.name,
    });

    const bio = this.artistLastFm.bio.content
      .trim()
      .replace('<a', '<br><a')
      .replace('</a>. ', '</a>.<span class="legal">')
      .concat('</span>');

    $('.bio-text').html(bio);
  }

  private renderTags() {
    const tags = this.artistLastFm.tags.tag;
    const markup = tags
      .map((tag) => `<span class="tag">#${tag.name}</span>`)
      .join('');
    $('.tags').html(markup);
  }
}
