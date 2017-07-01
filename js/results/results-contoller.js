import ResultsView from './results-view';

export default class ResultsController {
  constructor(application) {
    this.application = application;
    this.stats = this.application.model.state.game;
    this.screen = new ResultsView(this.stats);
  }

  init() {
    this.findComparison();
    this.showScreen();
    this.screen.replayHandler = () => {
      this.application.model.resetState();
      this.application.showWelcome();
    };
  }

  showScreen() {
    const app = document.querySelector(`.app`);
    app.replaceChild(this.screen.element, app.querySelector(`.main`));
  }

  findComparison() {
    if (this.stats.result === `win`) {
      const statistics = this.application.model.state.history.slice();
      const myStatistics = this.stats.statistics;
      const myTime = parseInt(myStatistics.time, 10);
      const myRightAnswers = parseInt(myStatistics.answers, 10);

      const worseResults = statistics.filter((result) => {
        const rightAnswers = parseInt(result.answers, 10);

        return rightAnswers === myRightAnswers ? parseInt(result.time, 10) > myTime : rightAnswers < myRightAnswers;
      });

      this.stats.comparison = Math.floor(worseResults.length * 100 / statistics.length);
    }
  }
}
