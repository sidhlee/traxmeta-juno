import { Playlist } from './components/playlist.js';
import { Meta } from './components/meta.js';
import { getToken } from './data.js';
// TODO: slide between chart and meta with gesture (on mobile)
class App {
  constructor() {
    this.token = '';
  }
  async run() {
    await this.loadToken();
    // show top 200
    const playlist = new Playlist(this.token);
    await playlist.render();
    this.bindChartItemClickHandler();
    App.hideSpinner();
    App.showChart();
    // show meta for top track
    const topTrackMeta = new Meta(1, this.token);
    await topTrackMeta.render();
    App.showMeta();
    this.bindBackToChartClickHandler();
  }
  async loadToken() {
    this.token = await getToken();
  }
  // We're binding handlers here instead of inside each component (Chart and Meta) because
  // each handler affects both components.
  bindChartItemClickHandler() {
    const token = this.token;
    App.$chartList.on('click', '.chart-item', async function (e) {
      App.hideMeta();
      App.hideChart();
      App.rememberScrollPosition();
      const meta = new Meta(+this.dataset.rank, token);
      await meta.render();
      App.showMeta();
    });
  }
  bindBackToChartClickHandler() {
    $('.back-btn').on('click', () => {
      // Set the scrollTop back to where it was before sliding into meta section
      App.scrollToRememberedPosition(App.scrollTop);
      App.showChart();
      App.hideMeta();
    });
  }
  static rememberScrollPosition() {
    // remember scrollTop before setting it to 0 as we slide into meta section
    App.scrollTop = App.$app.scrollTop();
  }
  static scrollToRememberedPosition(previousScrollTop) {
    App.$app.scrollTop(previousScrollTop);
  }
  static hideSpinner() {
    $('.spinner').hide(); // we just want to make spinner disappear.
  }
  static hideMeta() {
    App.$meta.removeClass('show');
  }
  static showMeta() {
    App.$meta.addClass('show');
  }
  static hideChart() {
    App.$chart.removeClass('show');
  }
  static showChart() {
    App.$chart.addClass('show');
  }
}
App.scrollTop = 0;
App.$chart = $('.chart');
App.$meta = $('.meta');
App.$app = $('.app');
App.$chartList = $('.chart-list');
const app = new App();
app.run();
