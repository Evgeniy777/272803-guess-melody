import WelcomeView from './welcome-view';

export default class WelcomeController {
  constructor(application) {
    this.screen = new WelcomeView();
    this.application = application;
  }

  init() {
    this.showScreen();
    this.screen.startGameHandler = () => this.application.showGame();
  }

  showScreen() {
    const app = document.querySelector(`.app`);
    app.replaceChild(this.screen.element, app.querySelector(`.main`));
  }
}
