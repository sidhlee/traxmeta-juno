import * as Spotify from '../models/spotify';
import * as LastFm from '../models/last-fm';

export class MetaBio {
  constructor(
    private artist: Spotify.Artist,
    private lastFmArtist: LastFm.Artist
  ) {}

  // TODO: render multiple bio if artists.length > 1
  public render() {
    $('.artist-image > img').attr({
      src: this.artist.images[0].url,
      alt: this.artist.name,
    });

    let bio;

    if (this.lastFmArtist?.bio?.content) {
      bio = this.lastFmArtist.bio.content
        .trim()
        .replace('<a', '<br><a')
        .replace('</a>. ', '</a>.<span class="legal">')
        .concat('</span>');
    } else {
      bio =
        '<p class="not-available">Bio currently not available. Please try again later.</p>';
    }

    $('.bio-text').html(bio);

    MetaBio.renderTags(this.lastFmArtist);
  }

  private static renderTags(artistLastFm: LastFm.Artist) {
    const tags = artistLastFm.tags.tag;
    const markup = tags
      .map((tag) => `<span class="tag">#${tag.name}</span>`)
      .join('');
    $('.tags').html(markup);
  }
}
