import AbstractView from '../abstract-view';
import {ENTER_KEY_CODE} from '../constants';

export default class ResultsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const resultContent = {
      win: {
        title: `Вы настоящий меломан!`,
        stat: `За&nbsp;${this.state.time}&nbsp;секунд<br>вы&nbsp;отгадали ${this.state.answers}&nbsp;мелодии`,
        comparison: `<span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this.state.comparison}%&nbsp;игроков</span>`
      },
      loss: {
        title: `Вы проиграли`,
        stat: `Ничего, вам повезет в следующий раз`,
        comparison: ``
      }
    };
    const result = resultContent[this.state.result];

    return `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <h2 class="title">${result.title}</h2>
      <div class="main-stat">${result.stat}</div>
      ${result.comparison}
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
