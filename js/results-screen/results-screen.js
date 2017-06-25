import Application from '../application';
import ResultsScreen from './results-screen-view';
import {history} from '../data';

export default class ResultsScreenController {
  constructor(state) {
    this.state = state;
    this.screen = new ResultsScreen(this.state);
  }

  init() {
    this.findComparison();
    this.showScreen();
    this.screen.replayHandler = Application.showWelcome;
  }

  showScreen() {
    const app = document.querySelector(`.app`);
    app.replaceChild(this.screen.element, app.querySelector(`.main`));
  }

  findComparison() {
    if (this.state.result === `win`) {
      const statistics = history.slice();
      const myTime = this.state.statistics.time;
      const myRightAnswers = this.state.statistics.rightAnswers;

      const worseResults = statistics.filter((result) => {
        const rightAnswers = result.answers;

        return rightAnswers === myRightAnswers ? result.time > myTime : rightAnswers < myRightAnswers;
      });

      this.state.statistics.comparison = worseResults.length * 100 / statistics.length;
    }
  }
}
