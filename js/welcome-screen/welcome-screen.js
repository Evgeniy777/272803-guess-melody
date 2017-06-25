import {initialState} from '../data';
import Application from '../application';
import WelcomeScreen from './welcome-screen-view';

class WelcomeScreenController {
  constructor(state) {
    this.state = state;
    this.screen = new WelcomeScreen(this.state);
  }

  init() {
    this.showScreen();
    this.screen.startGameHandler = Application.showGame;
  }

  showScreen() {
    const app = document.querySelector(`.app`);
    app.replaceChild(this.screen.element, app.querySelector(`.main`));
  }
}

const welcomeScreenController = new WelcomeScreenController(initialState);

export default welcomeScreenController;
