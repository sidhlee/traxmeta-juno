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
    $('.categories').html(this.getCategoriesHtml());
    $('.track-stats').html(this.getStatsHtml());

    // Cover image
    $('.track-info__cover > img').attr({
      src: track.album.images[0].url, // 640 * 640 px
      alt: track.name,
    });
  }

  private getCategoriesHtml() {
    const genres = this.artist.genres;
    const categories = [...genres];
    if (this.track.explicit) {
      categories.push('explicit');
    }

    const markup = categories
      .map((c) => {
        return `<span class="category">${c}</span>`;
      })
      .join('');

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
    $('.lyrics-text').text(this.lyrics);
  }

  private renderBio() {
    $('.bio-text').html(this.artistLastFm.bio.content);
  }

  private renderTags() {
    const tags = this.artistLastFm.tags.tag;
    const markup = tags
      .map((tag) => `<span class="tag">#${tag.name}</span>`)
      .join('');
    return markup;
  }
}
