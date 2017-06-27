import AbstractView from '../abstract-view';
import {ENTER_KEY_CODE} from '../constants';
import initializePlayer from '../player';

export default class SingerQuestionView extends AbstractView {
  constructor(state, gameData) {
    super();
    this.game = gameData[state.questionType];
  }

  get template() {
    const mainAnswer = (answer, index) => `
      <div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${answer.name}" tabindex="-1" />
        <label class="main-answer" for="answer-${index}" tabindex="0">
          <img class="main-answer-preview" src="${answer.src}">
          ${answer.name}
        </label>
      </div>
    `;
    return `
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper"></div>
      <form class="main-list">${this.game.answers.map(mainAnswer).join(``)}</form>
    </div>
    `;
  }

  bind() {
    const firstGameScreen = this.element;
    const players = this.element.querySelectorAll(`.player-wrapper`);
    const author = this.game.author;

    [...players].forEach((player, index) => initializePlayer(player, this.game.url, true));

    const answerKeyDownHandler = (evt, isValidAnswer) => {
      if (evt.keyCode === ENTER_KEY_CODE) {
        this.checkAnswer(isValidAnswer);
      }
    };

    firstGameScreen.querySelectorAll(`.main-answer`).forEach((answer) => {
      const isValidAnswer = author === (answer.textContent).trim();

      answer.addEventListener(`click`, () => {
        this.checkAnswer(isValidAnswer);
      });
      answer.addEventListener(`keydown`, (evt) => answerKeyDownHandler(evt, isValidAnswer));
    });
  }

  checkAnswer() {

  }
}
