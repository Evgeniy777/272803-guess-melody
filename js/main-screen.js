import getElementFromTemplate from './get-element-from-template';
import showScreen from './show-screen';
import {initialState} from './data';
import renderFirstGameScreen from './first-game-screen';

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

const renderMainScreen = () => {
  const mainScreen = getElementFromTemplate(screenTemplate);
  const currentState = Object.assign({}, initialState, {
    game: `singer`
  });

  mainScreen.querySelector(`.main-play`).addEventListener(`click`, () => renderFirstGameScreen(currentState));

  showScreen(mainScreen);
};

export default renderMainScreen;
