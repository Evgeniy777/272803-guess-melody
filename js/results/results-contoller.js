import ResultsView from './results-view';
import {history} from '../data';

export default class ResultsController {
  constructor(application, state) {
    this.state = state;
    this.application = application;
    this.screen = new ResultsView(this.state);
  }

  init() {
    this.findComparison();
    this.showScreen();
    this.application.model.resetState();
    this.screen.replayHandler = () => this.application.showWelcome();
  }

  findComparison() {
    if (this.state.result === `win`) {
      const statistics = history.slice();
      const myTime = parseInt(this.state.time, 10);
      const myRightAnswers = parseInt(this.state.answers, 10);

      const worseResults = statistics.filter((result) => {
        const rightAnswers = result.answers;

        return rightAnswers === myRightAnswers ? result.time > myTime : rightAnswers < myRightAnswers;
      });

      this.state.comparison = worseResults.length * 100 / statistics.length;
    }

    return this.state.comparison;
  }

  showScreen() {
    const app = document.querySelector(`.app`);
    app.replaceChild(this.screen.element, app.querySelector(`.main`));
  }
}
