import WelcomeController from './welcome/welcome-controller';
import GameController from './game/game-controller';
import ResultsController from './results/results-contoller';
import {initialState} from './data';

const ControllerID = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

export default class Application {
  constructor() {
    this.router = {
      [ControllerID.WELCOME]: WelcomeController,
      [ControllerID.GAME]: GameController,
      [ControllerID.RESULT]: ResultsController
    };

    window.addEventListener(`hashchange`, () => {
      this.changeController();
    });
  }

  init() {
    this.changeController();
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
    let state;

    switch (controller) {
      case `result`:
        state = params;
        break;
      case `game`:
        state = Object.assign({}, initialState, {questionType: `singer`});
        break;
      case ``:
        state = null;
        break;
      default:
        this.showWelcome();
        return null;
    }

    const Controller = this.router[controller];
    const control = new Controller(state, this);
    control.init();

    return control;
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
