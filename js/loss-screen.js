import getElementFromTemplate from './get-element-from-template';
import showScreen from './show-screen';
import mainScreen from './main-screen';
import {ENTER_KEY_CODE} from './constants';

const lossScreen = getElementFromTemplate(`
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы проиграли</h2>
    <div class="main-stat">Ничего, вам повезет в следующий раз</div>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>
`);
const replay = lossScreen.querySelector(`.main-replay`);

replay.addEventListener(`click`, () => showScreen(mainScreen));
replay.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === ENTER_KEY_CODE) {
    showScreen(mainScreen);
  }
});

export default lossScreen;
