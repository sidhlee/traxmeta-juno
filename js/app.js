import { Playlist } from './components/playlist.js';
import { Meta } from './components/meta.js';
import { getToken } from './data/index.js';
// TODO: slide between chart and meta with gesture (on mobile)

const $chart = $('.chart');
const $meta = $('.meta');
const $app = $('.app');
const $chartList = $('.chart-list');
const $backButton = $('.back-btn');

let scrollTop = 0;
let token = '';

async function handleChartItemClick() {
  App.hideMeta();
  App.hideChart();
  App.rememberScrollPosition();

  const meta = new Meta(+this.dataset.rank, token);
  await meta.render();
  App.showMeta();
}

function handleBackToChartClick() {
  // Set the scrollTop back to where it was before sliding into meta section
  App.scrollToRememberedPosition(scrollTop);
  App.showChart();
  App.hideMeta();
}

const App = {
  async run() {
    // bind handlers
    $chartList.on('click', '.chart-item', handleChartItemClick);
    $backButton.on('click', handleBackToChartClick);

    // show top 200
    token = await getToken();
    const playlist = new Playlist(token);
    await playlist.render();
    App.hideSpinner();
    App.showChart();

    // show meta for top track
    const topTrackMeta = new Meta(1, token);
    await topTrackMeta.render();
    App.showMeta();
  },
  rememberScrollPosition() {
    // remember scrollTop before setting it to 0 as we slide into meta section
    scrollTop = $app.scrollTop();
  },
  scrollToRememberedPosition(previousScrollTop) {
    $app.scrollTop(previousScrollTop);
  },
  hideSpinner() {
    $('.spinner').hide(); // we just want to make spinner disappear.
  },
  hideMeta() {
    $meta.removeClass('show');
  },
  showMeta() {
    $meta.addClass('show');
  },
  hideChart() {
    $chart.removeClass('show');
  },
  showChart() {
    $chart.addClass('show');
  },
};

export default App;
