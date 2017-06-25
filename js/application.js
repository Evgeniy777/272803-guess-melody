import welcomeScreenController from './welcome-screen/welcome-screen';
import gameController from './game/game-screen-controller';
import ResultsScreenController from './results-screen/results-screen';

export default class Application {
  static showWelcome() {
    welcomeScreenController.init();
  }

  static showGame() {
    gameController.init();
  }

  static showResultsScreen(state) {
    const resultsScreenController = new ResultsScreenController(state);
    resultsScreenController.init();
  }
}
