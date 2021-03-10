import * as Spotify from '../models/spotify';
import * as LastFm from '../models/last-fm';
import { getArtist, formatDuration } from '../utils';
import track from '../data/track.json';

export interface MetaData {
  track: Spotify.Track;
  trackRank: number;
  artist: Spotify.Artist;
  lyrics: string;
  artistLastFm: LastFm.Artist;
}

export class Meta {
  private trackRank: number;
  private track: Spotify.Track;
  private artist: Spotify.Artist;
  private lyrics: string;
  private artistLastFm: LastFm.Artist;

  /**
   * Creates meta information for given track.
   * @param id spotify track id
   * @param trackName
   * @param artist
   */
  constructor({ track, trackRank, artist, lyrics, artistLastFm }: MetaData) {
    this.track = track;
    this.trackRank = trackRank;
    this.artist = artist;
    this.lyrics = lyrics;
    this.artistLastFm = artistLastFm;
  }

  // public fetch() {
  //   this.track = track as Spotify.Track;
  //   this.lyrics = lyrics.lyrics;
  //   this.artist = artist as Spotify.Artist;
  //   this.artistLastFm = (artistLastFm.artist as unknown) as LastFm.Artist;
  //   return this;
  // }

  public render() {
    $('.meta').scrollTop(0);
    $('.meta-header').removeClass('hidden');

    this.renderHero();
    this.renderLyrics();
    this.renderBio();
    this.renderTags();
  }

  private renderHero() {
    // Text content
    $('.track-rank > span').text(this.trackRank);
    $('.track-title').text(this.track.name);
    $('.track-artist > span').text(getArtist(this.track));
    $('.track-categories').html(this.getCategoriesHtml());
    $('.track-stats').html(this.getStatsHtml());

    // Cover image
    $('.track-info__cover > img').attr({
      src: this.track.album.images[0].url, // 640 * 640 px
      alt: this.track.name,
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

    // TODO: render multiple background-image if artists.length > 1
    $('.meta__lyrics').css(
      'background-image',
      `url("${this.artist.images[0].url}")`
    );
  }

  // TODO: render multiple bio if artists.length > 1
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
