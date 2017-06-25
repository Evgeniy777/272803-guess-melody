import {initialState} from '../data';
import Timer from './timer-view';
import Application from '../application';
import SingerQuestionScreen from './singer-question-view';
import GenreQuestionScreen from './genre-question-view';
import {gameData} from '../data';

export class GameController {
  constructor(state) {
    this.initialState = state;
    this.state = state;
    this.timer = new Timer(this.initialState);
    this.question = this.newQuestion;
  }

  init() {
    this.reset();
    this.showTimer();
    this.timer.finishGame = () => Application.showResultsScreen(this.changeState());
    this.timer.changeState = (time) => this.changeTime(time);
    this.initQuestion();
  }

  initQuestion() {
    this.showQuestion();
    this.question.checkAnswer = (isValidAnswer) => {
      this.changeState(isValidAnswer);
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
    if (this.state.result) {
      Application.showResultsScreen(this.state);
    } else {
      this.getNextQuestion();
      this.initQuestion();
    }
  }

  changeState(isValidAnswer) {
    const transitions = {
      genre: `singer`,
      singer: `genre`
    };

    const currentState = Object.assign({}, this.state, {
      questionType: transitions[this.state.questionType],
      leftMistakes: this.state.leftMistakes - (isValidAnswer ? 0 : 1),
      leftScreens: this.state.leftScreens - 1,
      statistics: Object.assign({}, this.state.statistics, {
        rightAnswers: this.state.statistics.rightAnswers + (isValidAnswer ? 1 : 0)
      })
    });

    if (currentState.statistics.time === currentState.duration || !currentState.leftMistakes) {
      currentState.result = `loss`;
    } else if (!currentState.leftScreens) {
      currentState.result = `win`;
    }

    this.state = currentState;

    return this.state;
  }

  changeTime(time) {
    const gameTime = initialState.duration - time.minutes * 60 - time.seconds;

    this.state = Object.assign({}, this.state, {
      statistics: Object.assign({}, this.state.statistics, {
        time: gameTime
      })
    });

    return this.state;
  }

  reset() {
    this.state = this.initialState;
    this.timer.stopTimer();
    this.timer = new Timer(this.initialState);
    this.getNextQuestion();
  }

  getNextQuestion() {
    const map = {
      singer: SingerQuestionScreen,
      genre: GenreQuestionScreen
    };

    this.question = new map[this.state.questionType](this.state, gameData);

    return this.question;
  }
}

const gameController = new GameController(Object.assign({}, initialState, {questionType: `singer`}));

export default gameController;
