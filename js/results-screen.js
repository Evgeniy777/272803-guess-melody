import getElementFromTemplate from './get-element-from-template';
import showScreen from './show-screen';
import renderMainScreen from './main-screen';
import {ENTER_KEY_CODE} from './constants';

const resultContent = {
  win: {
    title: `Вы настоящий меломан!`,
    stat: (statistics) => `За&nbsp;${statistics.time}&nbsp;секунд<br>вы&nbsp;отгадали ${statistics.rightAnswers}&nbsp;мелодии`,
    comparison: (statistics) => `<span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${statistics.comparison}%&nbsp;игроков</span>`
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
    <div class="main-stat">${result.stat(state.statistics)}</div>
    ${result.comparison(state.statistics)}
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
