import AbstractView from '../abstract-view';
import {ENTER_KEY_CODE} from '../constants';

export default class ResultsScreen extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
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
    const result = resultContent[this.state.result];

    return `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <h2 class="title">${result.title}</h2>
      <div class="main-stat">${result.stat(this.state.statistics)}</div>
      ${result.comparison(this.state.statistics)}
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>
    `;
  }

  bind() {
    const replay = this.element.querySelector(`.main-replay`);

    replay.addEventListener(`click`, () => this.replayHandler());
    replay.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === ENTER_KEY_CODE) {
        this.replayHandler();
      }
    });
  }

  replayHandler() {

  }
}
