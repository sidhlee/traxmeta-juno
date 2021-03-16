import * as Spotify from '../models/spotify';

export class MetaLyrics {
  constructor(private lyrics: string, private artist: Spotify.Artist) {}
  public render() {
    if (this.lyrics) {
      $('.lyrics-text').html(
        this.lyrics +
          '<br><p class="musix-match">Lyrics powered by www.musixmatch.com. This Lyrics is NOT for Commercial use and only 30% of the lyrics are returned.</p>'
      );
    } else {
      $('.lyrics-text').html(
        '<p class="not-available">Lyrics currently not available. Please try again later.</p>'
      );
    }

    this.renderLyricsBackground();
  }

  public renderLyricsBackground() {
    // TODO: render multiple background-image if artists.length > 1
    $('.meta__lyrics').css(
      'background-image',
      `url("${this.artist.images[0].url}")`
    );
  }
}
