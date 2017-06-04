import getElementFromTemplate from './get-element-from-template';
import showScreen from './show-screen';
import renderMainScreen from './main-screen';
import getTime from './get-time';
import {ENTER_KEY_CODE} from './constants';

const resultContent = {
  win: {
    title: `Вы настоящий меломан!`,
    stat: (state) => `За&nbsp;${getTime(120000 - [state.leftTime]).minutes}&nbsp;минуты<br>вы&nbsp;отгадали ${state.statistics.rightAnswers}&nbsp;мелодии`,
    comparison: (state) => `<span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${state.statistics.comparison}%&nbsp;игроков</span>`
  },
  loss: {
    title: `Вы проиграли`,
    stat: () => `Ничего, вам повезет в следующий раз`,
    comparison: () => ``
  }
};

const screenTemplate = (state) => {
  const result = resultContent[state.result];

  return `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${result.title}</h2>
    <div class="main-stat">${result.stat(state)}</div>
    ${result.comparison(state)}
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;
};

const renderResultsScreen = (state) => {
  const resultsScreen = getElementFromTemplate(screenTemplate(state));
  const replay = resultsScreen.querySelector(`.main-replay`);

  replay.addEventListener(`click`, () => renderMainScreen());
  replay.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === ENTER_KEY_CODE) {
      renderMainScreen();
    }
  });

  showScreen(resultsScreen);
};

export default renderResultsScreen;
