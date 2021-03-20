export class MetaBio {
    constructor(artist, lastFmArtist) {
        this.artist = artist;
        this.lastFmArtist = lastFmArtist;
    }
    // TODO: render multiple bio if artists.length > 1
    render() {
        var _a, _b;
        $('.artist-image > img').attr({
            src: this.artist.images[0].url,
            alt: this.artist.name,
        });
        let bio;
        if ((_b = (_a = this.lastFmArtist) === null || _a === void 0 ? void 0 : _a.bio) === null || _b === void 0 ? void 0 : _b.content) {
            bio = this.lastFmArtist.bio.content
                .trim()
                .replace('<a', '<br><a')
                .replace('</a>. ', '</a>.<span class="legal">')
                .concat('</span>');
        }
        else {
            bio =
                '<p class="not-available">Bio currently not available. Please try again later.</p>';
        }
        $('.bio-text').html(bio);
        MetaBio.renderTags(this.lastFmArtist);
    }
    static renderTags(artistLastFm) {
        const tags = artistLastFm.tags.tag;
        const markup = tags
            .map((tag) => `<span class="tag">#${tag.name}</span>`)
            .join('');
        $('.tags').html(markup);
    }
}
