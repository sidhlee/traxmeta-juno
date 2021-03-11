import * as Spotify from '../models/spotify';
import * as LastFm from '../models/last-fm';
import { getArtist, formatDuration } from '../utils';
import { getHeroData, getLyrics, getToken, getLastFmArtist } from '../data';

export interface MetaData {
  track: Spotify.Track;
  trackRank: number;
  artist: Spotify.Artist;
  lyrics: string;
  artistLastFm: LastFm.Artist;
}

export class Meta {
  private token: string | null;
  private artist: Spotify.Artist | null;
  private artistName: string;
  private artistId: string;
  private track: Spotify.Track | null;
  private trackName: string;
  private trackId: string;
  private trackRank: number;
  private lastFmArtist: LastFm.Artist | null;
  private lyrics: string = '';
  /**
   * Creates meta information for given track.
   * @param id spotify track id
   * @param trackName
   * @param artist
   */
  constructor(trackRank: number) {
    this.trackRank = trackRank;
    this.token = null;
    this.artist = null;
    this.track = null;
    this.lastFmArtist = null;

    const { track_id, artist_id, title, artist_name } = $('.chart-item')[
      trackRank - 1
    ].dataset;

    this.artistName = artist_name as string;
    this.trackName = title as string;
    this.trackId = track_id as string;
    this.artistId = artist_id as string;
  }

  public async render() {
    await this.loadToken();
    const { track, artist } = await this.loadHeroData();

    this.renderHero(track, artist);
    this.loadLyrics().then((lyrics) => {
      this.renderLyrics(lyrics, artist);
    });
    this.loadBioData().then((lastFmArtist) => {
      this.renderBio(artist, lastFmArtist);
    });
  }

  // Data Loaders
  private async loadToken() {
    const token = await getToken();

    this.token = token;
    return token;
  }

  private async loadHeroData() {
    const { artist, track } = await getHeroData(
      this.token as string,
      this.trackRank
    );
    this.track = track;
    this.artist = artist;

    return { track, artist };
  }

  private async loadLyrics() {
    const lyrics = await getLyrics(this.artistName, this.trackName);
    this.lyrics = lyrics;
    return lyrics;
  }

  private async loadBioData() {
    const lastFmArtist = await getLastFmArtist(this.artistName);
    this.lastFmArtist = lastFmArtist;
    return lastFmArtist;
  }

  // Renderers

  private async renderHero(track: Spotify.Track, artist: Spotify.Artist) {
    $('.meta').scrollTop(0);
    // Text content
    $('.track-rank > span').text(this.trackRank);
    $('.track-title').text(track.name);
    $('.track-artist > span').text(getArtist(track));
    $('.track-categories').html(Meta.getCategoriesHtml(artist, track));
    $('.track-stats').html(Meta.getStatsHtml(track));

    // Cover image
    $('.track-info__cover > img').attr({
      src: track.album.images[0].url, // 640 * 640 px
      alt: track.name,
    });

    $('.meta__hero').css(
      'background-image',
      `url("${track.album.images[0].url}")`
    );

    $('.meta-header').removeClass('hidden');
  }

  private static getCategoriesHtml(
    artist: Spotify.Artist,
    track: Spotify.Track
  ) {
    const genres = artist.genres;
    const categories = [...genres];

    let markup = categories
      .map((c) => {
        return `<span class="category pill">${c}</span>`;
      })
      .join('');

    if (track.explicit) {
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

  private renderLyrics(lyrics: string, artist: Spotify.Artist) {
    $('.lyrics-text').html(lyrics);

    // TODO: render multiple background-image if artists.length > 1
    $('.meta__lyrics').css(
      'background-image',
      `url("${artist.images[0].url}")`
    );
  }

  // TODO: render multiple bio if artists.length > 1
  private renderBio(artist: Spotify.Artist, lastFmArtist: LastFm.Artist) {
    $('.artist-image > img').attr({
      src: artist.images[0].url,
      alt: artist.name,
    });

    const bio = lastFmArtist.bio.content
      .trim()
      .replace('<a', '<br><a')
      .replace('</a>. ', '</a>.<span class="legal">')
      .concat('</span>');

    $('.bio-text').html(bio);

    Meta.renderTags(lastFmArtist);
  }

  private static renderTags(artistLastFm: LastFm.Artist) {
    const tags = artistLastFm.tags.tag;
    const markup = tags
      .map((tag) => `<span class="tag">#${tag.name}</span>`)
      .join('');
    $('.tags').html(markup);
  }
}
