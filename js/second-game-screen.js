import getElementFromTemplate from './get-element-from-template';
import checkResult from './check-result';
import changeState from './change-state';
import initializePlayer from './player';
import getTimeFromTemplate from './get-time-from-template';
import {gameData} from './data';

const genreAnswer = (answer, index) => `
  <div class="genre-answer">
    <div class="player-wrapper"></div>
    <input type="checkbox" name="answer" value="${answer.genre}" id="a-${index}">
    <label class="genre-answer-check" for="a-${index}"></label>
  </div>
`;

const screenTemplate = (state) => {
  const game = gameData[state.questionType];

  return `
  <div class="main-wrap">
    <h2 class="title">Выберите ${game.genre} треки</h2>
    <form class="genre">
      ${game.answers.map(genreAnswer).join(``)}
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </div>
  `;
};

const renderSecondGameScreen = (state) => {
  const gameScreen = document.querySelector(`.main--level`);
  const secondGameScreen = getElementFromTemplate(screenTemplate(state));
  const players = secondGameScreen.querySelectorAll(`.player-wrapper`);
  const game = gameData[state.questionType];

  [...players].forEach((player, index) => initializePlayer(player, game.answers[index].url));

  const answerInputs = secondGameScreen.querySelectorAll(`input[name="answer"]`);
  const sendAnswer = secondGameScreen.querySelector(`.genre-answer-send`);
  const screenForm = secondGameScreen.querySelector(`.genre`);
  const isInputCheckCorrect = (input, genre) => input.checked ? input.value === genre : input.value !== genre;

  screenForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    const isValidAnswer = [...answerInputs].every((input) => isInputCheckCorrect(input, game.genre));

    checkResult(changeState(state, getTimeFromTemplate(gameScreen), isValidAnswer));
  });

  sendAnswer.disabled = true;

  answerInputs.forEach((input) => {
    input.addEventListener(`change`, () => {
      const checkedAnswerInputs = [...answerInputs].some((checkbox) => checkbox.checked);

      sendAnswer.disabled = !checkedAnswerInputs;
    });
  });

  gameScreen.replaceChild(secondGameScreen, document.querySelector(`.main-wrap`));
};

export default renderSecondGameScreen;
