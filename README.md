# jQuery Music App

## Things I've learned

### Writing Asynchronous Code with OOP

...is not easy because you would normally need to pass in data into constructor to create an instance and which in turn, can be used to call public methods to do something with that data. **And this assumes that you have all the data available before you instantiate the object.** But in the real world, there are cases where you want to:

- Make an api call
- Then do something as soon as we get that data back.
- Then while rendering the main page, you want to fetch another data behind the scene
- Then we'll render that data as soon as we get the response.
- But, what if server is taking too much time to response or sending back an error?
- and many other what if's due to the nature of network request...

All of these make async OOP difficult because if different fields are available at unknown points of time, you have to implement many type checking and guarding inside the method that needs that data.

... but instead you can:

### Write Functions for Async Task (FP!)

and maybe export related functions from the same module so that later we can access them under the same namespace. With functional programing, you can:

1. Write functions that takes some data and returns something (or do something.)
2. Make the request for the data.
3. Pass the data to the function when it becomes available.
4. and if you want to chain next function, just pass that function as well to be called inside the first function(or better yet, use `async await`).

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

2. Then make sure you're adding the file extension when you're importing a module  
    (don't when you're using webpack.)

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

### ✨Netlify Dev & Functions✨

Netlify dev allows you to run entire netlify platform on your local machine so that you can:

- Test your app/site before deploying it to the netlify.
- Test site generator (eg. SSR), API integrations, serverless functions, etc...
- Have access to the ENV variable that you set up in your Netlify dashboard.
- Make request to the serverless functions through Netlify dev server.  
  (eg. `http://localhost:8888/.netlify/functions/get-token`)

So the typical workflow would be:

1. Have you installed `netlify-cli` globally? If yes, go to 2.
2. Run `netlify dev`
3. Is your site working as normal? If not, create and setup `netlify.toml` file.
4. Write your serverless functions inside `/netlify/functions` folder.
5. Make requests to the functions at the endpoint described above.

### Netlify.toml

Netlify dev will try to detect the site generator or build command that you're using, but if the app is not working as you expected, you can tell Netlify how to start your dev server. If you're using a build-tool or framework like `react-react-app` or `webpack`, you can specify the `targetPort` that your project is served at.

```toml
# sample netlify.toml
[build]
  command = "yarn run build"
  functions = "functions" # netlify dev uses this directory to scaffold and serve your functions
  publish = "dist"

# note: each of these fields are OPTIONAL, with an exception that when you're specifying "command" and "targetPort", you must specify framework = "#custom"
[dev]
  framework = "#custom" # necessary when specifying both command and targetPort
  command = "yarn start" # Command to start your dev server
  targetPort = 8080 # The port for your application server(webpack serve), framework or site generator
  port = 5000 # The port that the netlify dev will be accessible on
  publish = "dist" # The path to your static content folder
  jwtSecret = "secret" # The secret used to verify tokens for JWT based redirects
  jwtRolePath = "app_metadata.authorization.roles" # Object path we should look for role values for JWT based redirects
  autoLaunch = true # a Boolean value that determines if Netlify Dev launches the local server address in your browser
```

### Reding local .env files from Netlify functions

When you read `process.env` inside Netlify functions, it reads from the environment variable that you set with Netlify UI, not from local .env files.  
Here's a little workaround when you want to access local env variable before deploying into Netlify and setup env variables.

```js
const path = require('path');
const envConfig = require('dotenv').config({
  path: path.resolve(__dirname, '../../src/config/dev.env'),
});

Object.entries(envConfig.parsed || {}).forEach(
  ([key, value]) => (process.env[key] = value)
);

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'GET') return;
  console.log(process.env);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello' }),
  };
};
```

### How to post urlencoded data with Axios

Some API requires you to send post data in urlencoded format. If so, all you need to do is use `qs` package to stringify(encode) body data.

```js
const axios = require('axios').default;
const qs = require('qs');

const { data } = await axios({
  method: 'post',
  url: process.env.URL_TOKEN_SPOTIFY,
  data: qs.stringify({
    grant_type: 'client_credentials',
  }),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${authString}`,
  },
});
```

## User Stories

1. I can see a list of song covers when the main page loads.
2. I can see a track title, artist, release year when I hover on the song cover.
3. I can click on the song cover to open a modal with detailed track info (title, artist, year, genre, lyrics...)
4. I can click on a button to go to a lyrics pages that shows lyrics and artist image in the background.

## References

- [MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API)
- [MusicBrainz JavaScript SDK](https://github.com/Borewit/musicbrainz-api)
- [MusicBrainz Cover Art Archive API](https://musicbrainz.org/doc/Cover_Art_Archive/API)
- [Lyrics.ovh](http://docs.lyricsovh.apiary.io/) - Simple API to retrieve the lyrics of a song
- [hqjs](https://github.com/hqjs/hq) - Lightning fast, zero configuration, web application development server
