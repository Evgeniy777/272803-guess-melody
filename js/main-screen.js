import getElementFromTemplate from './get-element-from-template';
import showScreen from './show-screen';
import {initialState} from './data';
import renderFirstGameScreen from './first-game-screen';
import getGameScreen from './game-screen';
import initializeCountdown from './timer';

const screenTemplate = `
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;2 минуты дать
      максимальное количество правильных ответов.<br>
      Удачи!
    </p>
  </section>`;

const startGame = (state) => {
  showScreen(getGameScreen(state));
  renderFirstGameScreen(state);
  initializeCountdown(state);
};

const renderMainScreen = () => {
  const mainScreen = getElementFromTemplate(screenTemplate);

  mainScreen.querySelector(`.main-play`).addEventListener(`click`, () => startGame(initialState));

  showScreen(mainScreen);
};

export default renderMainScreen;
