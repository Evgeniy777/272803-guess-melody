import TimerView from './timer-view';
import SingerQuestionView from './singer-question-view';
import GenreQuestionView from './genre-question-view';

export default class GameController {
  constructor(application) {
    this.application = application;
    this.model = this.application.model;
    this.timer = new TimerView(this.application.model.state);
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
    if (this.model.state.result) {
      this.application.showResultsScreen(this.model.state);
      this.resetTimer();
    } else {
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
