# jQuery Music App

## References

- [MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API)
- [MusicBrainz JavaScript SDK](https://github.com/Borewit/musicbrainz-api)
- [MusicBrainz Cover Art Archive API](https://musicbrainz.org/doc/Cover_Art_Archive/API)
- [Lyrics.ovh](http://docs.lyricsovh.apiary.io/) - Simple API to retrieve the lyrics of a song
- [hqjs](https://github.com/hqjs/hq) - Lightning fast, zero configuration, web application development server

## hqjs

It's really cool that I'm able to write typescript and sass out of the box, but I needed an option to choose different targets (ES5 vs ES6) and between minified/non-minified version.  
Also, the vsc extension feels a little bit intrusive to show its own commands (not just one!) in every time I right-click on a file.

## Integrating TypeScript with Webpack

- https://medium.com/jspoint/integrating-typescript-with-webpack-4534e840a02b

## User Stories

1. I can see a list of song covers when the main page loads.
2. I can see a track title, artist, release year when I hover on the song cover.
3. I can click on the song cover to open a modal with detailed track info (title, artist, year, genre, lyrics...)
4. I can click on a button to go to a lyrics pages that shows lyrics and artist image in the background.
5. I can search by an artist, track, or genre to see a new list.
6. I can add a song to personal playlist.
7. I can click on a link to go to the song's youtube or spotify page.
