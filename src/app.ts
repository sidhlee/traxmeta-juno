import './style.scss';
import { Playlist } from './components/playlist';
import { Meta } from './components/meta';
import { getToken } from './data';

// TODO: slide between chart and meta with gesture (on mobile)

class App {
  private static scrollTop = 0;
  private static $chart = $('.chart');
  private static $meta = $('.meta');
  private static $app = $('.app');
  private static $chartList = $('.chart-list');
  private token = '';
  constructor() {}

  public async run() {
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

  private async loadToken() {
    this.token = await getToken();
  }

  // We're binding handlers here instead of inside each component (Chart and Meta) because
  // each handler affects both components.
  private bindChartItemClickHandler() {
    const token = this.token;

    App.$chartList.on('click', '.chart-item', async function (e) {
      App.hideMeta();
      App.hideChart();

      App.rememberScrollPosition();

      const meta = new Meta(+(this.dataset.rank as string), token);
      await meta.render();

      App.showMeta();
    });
  }

  private bindBackToChartClickHandler() {
    $('.back-btn').on('click', () => {
      // Set the scrollTop back to where it was before sliding into meta section
      App.scrollToRememberedPosition(App.scrollTop);
      App.showChart();
      App.hideMeta();
    });
  }

  private static rememberScrollPosition() {
    // remember scrollTop before setting it to 0 as we slide into meta section
    App.scrollTop = App.$app.scrollTop() as number;
  }
  private static scrollToRememberedPosition(previousScrollTop: number) {
    App.$app.scrollTop(previousScrollTop);
  }

  private static hideSpinner() {
    $('.spinner').hide(); // we just want to make spinner disappear.
  }
  private static hideMeta() {
    App.$meta.removeClass('show');
  }
  private static showMeta() {
    App.$meta.addClass('show');
  }
  private static hideChart() {
    App.$chart.removeClass('show');
  }
  private static showChart() {
    App.$chart.addClass('show');
  }
}

const app = new App();
app.run();
