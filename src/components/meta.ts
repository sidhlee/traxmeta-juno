import * as Spotify from '../models/spotify';
import * as LastFm from '../models/last-fm';
import { MetaHero } from './meta-hero';

import { getHeroData, getLyrics, getLastFmArtist } from '../data';
import { MetaLyrics } from './meta-lyrics';
import { MetaBio } from './meta-bio';

export class Meta {
  private token: string | null;
  private artist: Spotify.Artist | null;
  private artistName: string;
  private trackName: string;
  private trackRank: number;
  private lastFmArtist: LastFm.Artist | null;
  private lyrics: string = '';

  /**
   * Creates meta information for given track.
   * @param id spotify track id
   * @param trackName
   * @param artist
   */
  constructor(trackRank: number, token: string) {
    this.trackRank = trackRank;
    this.token = token;
    this.artist = null;
    this.lastFmArtist = null;

    const { track_id, artist_id, title, artist_name } = $('.chart-item')[
      trackRank - 1
    ].dataset;

    this.artistName = artist_name as string;
    this.trackName = title as string;
  }

  public async render() {
    // When the user slides over to the meta section,
    // scrollTop value of chart will automatically be applied to meta.
    // So we need to set it back to 0 to display meta header of the track.
    // (we're setting it back to the original value when user clicks on 'Back to Chart' button)
    $('.app').scrollTop(0);
    const { track, artist } = await this.loadHeroData();
    const hero = new MetaHero(this.trackRank, track, artist);
    hero.render();

    return Promise.all([
      this.loadLyrics()
        .then((lyrics) => {
          new MetaLyrics(this.lyrics, this.artist as Spotify.Artist).render();
        })
        .catch((err) => {
          // update background even if lyrics couldn't be fetched.
          new MetaLyrics(
            this.lyrics,
            this.artist as Spotify.Artist
          ).renderLyricsBackground();
        }),
      this.loadBioData()
        .then(() => {
          new MetaBio(
            this.artist as Spotify.Artist,
            this.lastFmArtist as LastFm.Artist
          ).render();
        })
        .catch((err) => console.log(err)),
    ]);
  }

  private async loadHeroData() {
    const { artist, track } = await getHeroData(
      this.token as string,
      this.trackRank
    );
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
}
