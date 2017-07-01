import TimerView from './timer-view';
import SingerQuestionView from './singer-question-view';
import GenreQuestionView from './genre-question-view';

export default class GameController {
  constructor(application) {
    this.application = application;
    this.model = this.application.model;
    this.timer = new TimerView(this.application.model.state.duration);
  }

  init() {
    this.showTimer();
    this.timer.finishGame = () => this.application.showResultsScreen(this.model.changeState());
    this.timer.changeState = (time) => this.model.changeTime(time);
    this.getNextQuestion();
    this.initQuestion();
  }

  initQuestion() {
    this.showQuestion();
    this.question.checkAnswer = (isValidAnswer) => {
      this.model.changeState(isValidAnswer);
      this.checkResult();
    };
  }

  showTimer() {
    const app = document.querySelector(`.app`);
    app.replaceChild(this.timer.element, app.querySelector(`.main`));
  }

  showQuestion() {
    const gameScreen = document.querySelector(`.main--level`);

    gameScreen.replaceChild(this.question.element, document.querySelector(`.main-wrap`));
  }

  checkResult() {
    const game = this.model.state.game;

    switch (game.result) {
      case `win`:
        const preloadRemove = this.application.showPreloader();

        this.resetTimer();
        this.model.save(game.statistics)
          .then(() => this.model.loadStatistics())
          .then(preloadRemove)
          .then(() => this.application.showResultsScreen(game));
        break;
      case `loss`:
        this.resetTimer();
        this.application.showResultsScreen(game);
        break;
      default:
        this.getNextQuestion();
        this.initQuestion();
    }
  }

  resetTimer() {
    this.timer.stopTimer();
  }

  getNextQuestion() {
    const question = this.model.state.questions[this.model.state.questionNumber];

    const map = {
      artist: SingerQuestionView,
      genre: GenreQuestionView
    };

    this.question = new map[question.type](question);

    return this.question;
  }
}
