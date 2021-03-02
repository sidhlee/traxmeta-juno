# jQuery Music App

## Things I've learned

### TypeScript: "exports is not defined" error in console

1. You need to change "module" value from "commonjs" to "es2015"
   `tsconfig.json`

   ```json
   {
     "compilerOptions": {
       /* ... */
       "module": "es2015"
       /* ... */
     }
   }
   ```

2. Then make sure you're adding teh file extension when you're importing a module

   ```js
   import { Track } from './components/track.js'; // without .js, you'll see 404 file not found
   ```

### hqjs

It's really cool that I'm able to write typescript and sass out of the box, but I needed an option to choose different targets (ES5 vs ES6) and between minified/non-minified version.  
Also, the vsc extension feels a little bit intrusive to show its own commands (not just one!) in every time I right-click on a file.

### Live Sass Compiler: changing output path

`settings.json`

```json
{
  /* ... */
  "liveSassCompile.settings.formats": [
    {
      "extensionName": ".css",
      "format": "expanded",
      "savePath": "/"
    }
  ],
  "liveSassCompile.settings.generateMap": false
}
```

### Relative vs absolute import with TypeScript

You can use relative import with TypeScript by setting `compilerOptions.module` to 'es2015' or higher, but this does not give you the ability to import libraries under `node_modules` with absolute import.  
You need a module bundler or loader for that (eg. Webpack.)

## User Stories

1. I can see a list of song covers when the main page loads.
2. I can see a track title, artist, release year when I hover on the song cover.
3. I can click on the song cover to open a modal with detailed track info (title, artist, year, genre, lyrics...)
4. I can click on a button to go to a lyrics pages that shows lyrics and artist image in the background.
5. I can search by an artist, track, or genre to see a new list.
6. I can add a song to personal playlist.
7. I can click on a link to go to the song's youtube or spotify page.

## References

- [MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API)
- [MusicBrainz JavaScript SDK](https://github.com/Borewit/musicbrainz-api)
- [MusicBrainz Cover Art Archive API](https://musicbrainz.org/doc/Cover_Art_Archive/API)
- [Lyrics.ovh](http://docs.lyricsovh.apiary.io/) - Simple API to retrieve the lyrics of a song
- [hqjs](https://github.com/hqjs/hq) - Lightning fast, zero configuration, web application development server
