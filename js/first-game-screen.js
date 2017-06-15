import getElementFromTemplate from './get-element-from-template';
import checkResult from './check-result';
import changeState from './change-state';
import initializePlayer from './player';
import getTimeFromTemplate from './get-time-from-template';
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
  <div class="main-wrap">
    <h2 class="title main-title">Кто исполняет эту песню?</h2>
    <div class="player-wrapper"></div>
    <form class="main-list">${gameData[state.questionType].answers.map(mainAnswer).join(``)}</form>
  </div>
`;

const renderFirstGameScreen = (state) => {
  const gameScreen = document.querySelector(`.main--level`);
  const firstGameScreen = getElementFromTemplate(screenTemplate(state));
  const author = gameData[state.questionType].author;
  const player = firstGameScreen.querySelector(`.player-wrapper`);
  initializePlayer(player, gameData[state.questionType].url, true);

  const checkArtist = (isValidAnswer) => checkResult(changeState(state, getTimeFromTemplate(gameScreen), isValidAnswer));

  const answerKeyDownHandler = (evt, isValidAnswer) => {
    if (evt.keyCode === ENTER_KEY_CODE) {
      checkArtist(isValidAnswer);
    }
  };

  firstGameScreen.querySelectorAll(`.main-answer`).forEach((answer) => {
    const isValidAnswer = author === (answer.textContent).trim();

    answer.addEventListener(`click`, () => checkArtist(isValidAnswer));
    answer.addEventListener(`keydown`, (evt) => answerKeyDownHandler(evt, isValidAnswer));
  });

  gameScreen.replaceChild(firstGameScreen, document.querySelector(`.main-wrap`));
};

export default renderFirstGameScreen;
