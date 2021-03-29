# TraxMeta

A jQuery app that displays Spotify Global Top200 chart and shows meta information about the track user selected.

> Note: Because all API requests are made against netlify lambda functions with different origin, you would sometimes get CORS error on initial page load on local server. Try refreshing the page after few minutes to resolve this problem.

## [Live Demo](https://traxmeta.netlify.app/) 🚀

## Modified for submission to Winter3 JavaScript (Api Assignment)

- `.ts` files compiled into es2018 javaScript
  - file extensions added to all imports
- All Webpack related files and folders removed
  - packages added to `index.html` as CDN
- Request urls changed to remote netlify serverless functions (cors enabled)
- All config files removed (eslint, prettier, etc...)
- `style.scss` compiled into css using **DartSass** extension
- [Original repo](https://github.com/toypiano/traxmeta)
