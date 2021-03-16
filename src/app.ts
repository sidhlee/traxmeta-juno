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
    this.showChart();

    // show meta for top track
    const topTrackMeta = new Meta(1, this.token);
    await topTrackMeta.render();
    App.showMeta();
    this.bindBackToChartClickHandler();
  }

  private async loadToken() {
    this.token = await getToken();
  }

  private showChart() {
    $('.spinner').hide(); // we just want to make spinner disappear.
    App.$chart.addClass('show'); // specific css rules are applied when we're "showing" chart component
  }

  private bindChartItemClickHandler() {
    const token = this.token;

    App.$chartList.children('.chart-item').on('click', async function () {
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
  private static rememberScrollPosition() {
    // remember scrollTop before setting it to 0 as we slide into meta section
    App.scrollTop = App.$app.scrollTop() as number;
  }
  private static scrollToRememberedPosition(previousScrollTop: number) {
    App.$app.scrollTop(previousScrollTop);
  }
}

const app = new App();
app.run();
