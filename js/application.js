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

    this.model.load()
      .then(() => this.setup())
      .then(preloadRemove)
      .then(() => this.changeController())
      .catch(window.console.error);
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

  showResultsScreen(state) {
    let result = {
      controller: ControllerID.RESULT
    };

    switch (state.result) {
      case `win`:
        result.params = {
          result: state.result,
          time: state.statistics.time,
          answers: state.statistics.rightAnswers
        };
        break;
      case `loss`:
        result.params = {
          result: state.result
        };
    }

    location.hash = Application.serialize(result);
  }

  changeController() {
    const {controller, params} = Application.deserialize(location.hash);
    const Controller = this.router[controller];

    if (Controller) {
      new Controller(this, params).init();
    } else {
      this.showWelcome();
    }
  }

  static serialize(state) {
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
  }
}
