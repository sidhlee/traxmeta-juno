import { MetaHero } from './meta-hero.js';
import { getHeroData, getLyrics, getLastFmArtist } from '../data/index.js';
import { MetaLyrics } from './meta-lyrics.js';
import { MetaBio } from './meta-bio.js';
export class Meta {
  /**
   * Creates meta information for given track.
   * @param id spotify track id
   * @param trackName
   * @param artist
   */
  constructor(trackRank, token) {
    this.lyrics = '';
    this.trackRank = trackRank;
    this.token = token;
    this.artist = null;
    this.lastFmArtist = null;
    const { title, artist_name } = $('.chart-item')[trackRank - 1].dataset;
    this.artistName = artist_name;
    this.trackName = title;
  }
  async render() {
    // When the user slides over to the meta section,
    // scrollTop value of chart will automatically be applied to meta.
    // So we need to set it back to 0 to display meta header of the track.
    // (we're setting it back to the original value when user clicks on 'Back to Chart' button)
    $('.app').scrollTop(0);
    const { track, artist } = await this.loadHeroData();
    const hero = new MetaHero(this.trackRank, track, artist);
    hero.render();

    // load lyrics and bio concurrently
    return Promise.all([
      this.loadLyrics()
        .then((lyrics) => {
          new MetaLyrics(this.lyrics, this.artist).render();
        })
        .catch((err) => {
          // update background even if lyrics couldn't be fetched.
          new MetaLyrics(this.lyrics, this.artist).renderLyricsBackground();
        }),
      this.loadBioData()
        .then(() => {
          new MetaBio(this.artist, this.lastFmArtist).render();
        })
        .catch((err) => console.log(err)),
    ]);
  }
  async loadHeroData() {
    const { artist, track } = await getHeroData(this.token, this.trackRank);
    this.artist = artist;
    return { track, artist };
  }
  async loadLyrics() {
    const lyrics = await getLyrics(this.artistName, this.trackName);
    this.lyrics = lyrics;
    return lyrics;
  }
  async loadBioData() {
    const lastFmArtist = await getLastFmArtist(this.artistName);
    this.lastFmArtist = lastFmArtist;
    return lastFmArtist;
  }
}
