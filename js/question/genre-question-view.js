import AbstractView from '../abstract-view';
import initializePlayer from '../player';

export default class GenreQuestionScreen extends AbstractView {
  constructor(state, gameData) {
    super();
    this.game = gameData[state.questionType];
  }

  get template() {
    const genreAnswer = (answer, index) => `
      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="${answer.genre}" id="a-${index}">
        <label class="genre-answer-check" for="a-${index}"></label>
      </div>
    `;

    return `
    <div class="main-wrap">
      <h2 class="title">Выберите ${this.game.genre} треки</h2>
      <form class="genre">
        ${this.game.answers.map(genreAnswer).join(``)}
        <button class="genre-answer-send" type="submit" disabled>Ответить</button>
      </form>
    </div>
    `;
  }

  bind() {
    const screenForm = this.element.querySelector(`.genre`);
    const answerInputs = this.element.querySelectorAll(`input[name="answer"]`);
    const players = this.element.querySelectorAll(`.player-wrapper`);

    [...players].forEach((player, index) => initializePlayer(player, this.game.answers[index].url));

    screenForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      const isInputCheckCorrect = (input, genre) => input.checked ? input.value === genre : input.value !== genre;
      const isValidAnswer = [...answerInputs].every((answerInput) => isInputCheckCorrect(answerInput, this.game.genre));

      this.checkAnswer(isValidAnswer);
    });

    answerInputs.forEach((input) => {
      input.addEventListener(`change`, () => {
        const checkedAnswerInputs = [...answerInputs].some((checkbox) => checkbox.checked);

        this.element.querySelector(`.genre-answer-send`).disabled = !checkedAnswerInputs;
      });
    });
  }

  checkAnswer() {

  }
}
