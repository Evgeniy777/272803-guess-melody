import getElementFromTemplate from './get-element-from-template';
import showScreen from './show-screen';
import renderSecondGameScreen from './second-game-screen';
import checkResult from './check-result';
import changeState from './change-state';
import timerTemplate from './timer-template';
import {ENTER_KEY_CODE} from './constants';
import {gameData} from './data';

const mainAnswer = (answer, index) => `
  <div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${answer.name}" tabindex="-1" />
    <label class="main-answer" for="answer-${index}" tabindex="0">
      <img class="main-answer-preview" src="${answer.src}">
      ${answer.name}
    </label>
  </div>
`;

export const screenTemplate = (state) => `
  <section class="main main--level main--level-artist">
    ${timerTemplate(state.leftTime)}
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper"></div>
      <form class="main-list">${gameData[state.game].answers.map(mainAnswer).join(``)}</form>
    </div>
  </section>
`;

const renderFirstGameScreen = (state) => {
  const firstGameScreen = getElementFromTemplate(screenTemplate(state));
  const author = gameData[state.game].author;

  const answerClickHandler = (isValidAnswer) => checkResult(changeState(state, isValidAnswer), renderSecondGameScreen);
  const answerKeyDownHandler = (evt, isValidAnswer) => {
    if (evt.keyCode === ENTER_KEY_CODE) {
      checkResult(changeState(state, isValidAnswer), renderSecondGameScreen);
    }
  };

  firstGameScreen.querySelectorAll(`.main-answer`).forEach((answer) => {
    const isValidAnswer = author === (answer.textContent).trim();

    answer.addEventListener(`click`, () => answerClickHandler(isValidAnswer));
    answer.addEventListener(`keydown`, (evt) => answerKeyDownHandler(evt, isValidAnswer));
  });

  showScreen(firstGameScreen);
};

export default renderFirstGameScreen;
