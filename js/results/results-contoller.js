import ResultsView from './results-view';

export default class ResultsController {
  constructor(application) {
    this.application = application;
    this.stats = this.application.model.state.game;
    this.screen = new ResultsView(this.stats);
  }

  init() {
    this.showScreen();
    this.application.model.resetState();
    this.screen.replayHandler = () => this.application.showWelcome();
  }

  showScreen() {
    const app = document.querySelector(`.app`);
    app.replaceChild(this.screen.element, app.querySelector(`.main`));
  }
}
