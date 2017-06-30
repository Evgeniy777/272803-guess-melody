import WelcomeController from './welcome/welcome-controller';
import GameController from './game/game-controller';
import ResultsController from './results/results-contoller';
import Model from './model/model';
import PreloadView from './preload/preload-view';

const ControllerID = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

export default class Application {
  constructor() {
    const preloadRemove = this.showPreloader();
    this.model = new Model();

    this.model.load(`questions`)
      .then(() => this.loadGameAudios())
      .then(() => this.setup())
      .then(preloadRemove)
      .then(() => this.changeController())
      .catch((error) => window.console.warn(error));
  }

  setup() {
    this.router = {
      [ControllerID.WELCOME]: WelcomeController,
      [ControllerID.GAME]: GameController,
      [ControllerID.RESULT]: ResultsController
    };

    window.addEventListener(`hashchange`, () => {
      this.changeController();
    });
  }

  loadAudio(url) {
    const getAudio = () => new Promise((resolve, reject) => {
      const audio = document.createElement(`audio`);
      audio.src = url;

      audio.onloadeddata = (evt) => resolve(evt.target.response);
      audio.onerror = () => reject(`Error`);
    });
    return getAudio()
      .catch((error) => window.console.warn(error));
  }

  loadGameAudios() {
    const urls = [];
    this.model.state.questions.forEach((question) => question.src ? urls.push(question.src) : question.answers.forEach((answer) => urls.push(answer.src)));

    return Promise.all(urls.map((url) => this.loadAudio(url)))
      .catch((error) => window.console.warn(error));
  }

  showPreloader() {
    const preloadView = new PreloadView();
    preloadView.start();

    return () => preloadView.hide();
  }

  showWelcome() {
    location.hash = ControllerID.WELCOME;
  }

  showGame() {
    location.hash = ControllerID.GAME;
  }

  showResultsScreen() {
    location.hash = ControllerID.RESULT;
  }

  changeController() {
    const controller = this.getControllerFromHash(location.hash);
    const Controller = this.router[controller];

    if (Controller) {
      new Controller(this).init();
    } else {
      this.showWelcome();
    }
  }

  getControllerFromHash(hash) {
    return hash.substr(1);
  }

  /* static serialize(state) {
    const paramKeys = Object.keys(state.params);
    return `${state.controller}` + (paramKeys.length ? `?` + paramKeys.map((param) => `${param}=${state.params[param]}`).join(`&`) : ``);
  }

  static deserialize(hash) {
    const [controller, queryString] = hash.substr(1).split(`?`);
    const params = {};

    if (queryString) {
      queryString.split(`&`).forEach((param) => {
        const [key, value] = param.split(`=`);

        params[key] = value;
      });
    }

    return {controller, params};
  }*/
}
