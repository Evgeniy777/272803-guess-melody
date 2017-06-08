import getElementFromTemplate from './get-element-from-template';
import showScreen from './show-screen';
import renderFirstGameScreen from './first-game-screen';
import checkResult from './check-result';
import changeState from './change-state';
import timerTemplate from './timer-template';
import {gameData} from './data';

const genreAnswer = (answer, index) => `
  <div class="genre-answer">
    <div class="player-wrapper"></div>
    <input type="checkbox" name="answer" value="${answer.genre}" id="a-${index}">
    <label class="genre-answer-check" for="a-${index}"></label>
  </div>
`;

const screenTemplate = (state) => {
  const game = gameData[state.game];

  return `<section class="main main--level main--level-genre">
    ${timerTemplate(state.leftTime)}
    <h2 class="title">Выберите ${game.genre} треки</h2>
    <form class="genre">
      ${game.answers.map(genreAnswer).join(``)}
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </section>`;
};

const renderSecondGameScreen = (state) => {
  const secondGameScreen = getElementFromTemplate(screenTemplate(state));

  const answerInputs = secondGameScreen.querySelectorAll(`input[name="answer"]`);
  const sendAnswer = secondGameScreen.querySelector(`.genre-answer-send`);
  const screenForm = secondGameScreen.querySelector(`.genre`);
  const isInputCheckCorrect = (input, genre) => input.checked ? input.value === genre : input.value !== genre;

  screenForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    const isValidAnswer = [...answerInputs].every((input) => isInputCheckCorrect(input, gameData[state.game].genre));

    checkResult(changeState(state, isValidAnswer), renderFirstGameScreen);
  });

  sendAnswer.disabled = true;

  answerInputs.forEach((input) => {
    input.addEventListener(`change`, () => {
      const checkedAnswerInputs = [...answerInputs].some((checkbox) => checkbox.checked);

      sendAnswer.disabled = !checkedAnswerInputs;
    });
  });

  showScreen(secondGameScreen);
};

export default renderSecondGameScreen;
