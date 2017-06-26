import GameController from './game-controller';
import assert from 'assert';

describe(`GameController#changeState()`, () => {
  it(`next state object is not equal to the initial state object`, () => {
    const state = {
      questionType: `singer`,
      leftMistakes: 3,
      leftScreens: 10,
      statistics: {rightAnswers: 0}
    };
    const gameController = new GameController(state, null);
    gameController.changeState(true);
    assert.notEqual(gameController.state, gameController.initialState);
  });
  describe(`#questionType`, () => {
    it(`should always change the game screen, while the game goes on`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 3,
        leftScreens: 10,
        statistics: {rightAnswers: 0}
      };
      const gameController = new GameController(state, null);
      gameController.changeState(true);
      assert.equal(gameController.state.questionType, `genre`);

      const state1 = {
        questionType: `genre`,
        leftMistakes: 3,
        leftScreens: 10,
        statistics: {rightAnswers: 0}
      };
      const gameController1 = new GameController(state1, null);
      gameController1.changeState(false);
      assert.equal(gameController1.state.questionType, `singer`);
    });
  });
  describe(`#leftMistakes`, () => {
    it(`should always be decremented, if the answer is wrong`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 3,
        leftScreens: 10,
        statistics: {rightAnswers: 0}
      };
      const gameController = new GameController(state, null);
      gameController.changeState(false);
      assert.equal(gameController.state.leftMistakes, 2);
    });
    it(`should always stay static, if the answer is correct`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 3,
        leftScreens: 10,
        statistics: {rightAnswers: 0}
      };
      const gameController = new GameController(state, null);
      gameController.changeState(true);
      assert.equal(gameController.state.leftMistakes, 3);
    });
    it(`if becomes 0, the game always finishes`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 1,
        leftScreens: 8,
        statistics: {rightAnswers: 0}
      };
      const gameController = new GameController(state, null);
      gameController.changeState(false);
      assert.equal(gameController.state.result, `loss` || `win`);
    });
  });
  describe(`#leftScreens`, () => {
    it(`should always be decremented, whether the answer is wrong or correct`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 3,
        leftScreens: 10,
        statistics: {rightAnswers: 0}
      };
      const gameController = new GameController(state, null);
      gameController.changeState(true);
      assert.equal(gameController.state.leftScreens, 9);

      gameController.changeState(false);
      assert.equal(gameController.state.leftScreens, 8);
    });
    it(`if becomes 0, the game always finishes`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 2,
        leftScreens: 1,
        statistics: {rightAnswers: 0},
        result: null
      };
      const gameController = new GameController(state, null);
      gameController.changeState(false);
      assert.equal(gameController.state.result, `loss` || `win`);
    });
  });
  describe(`#rightAnswers`, () => {
    it(`should always be incremented, if the answer is correct`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 2,
        leftScreens: 1,
        statistics: {rightAnswers: 0}
      };
      const gameController = new GameController(state, null);
      gameController.changeState(true);
      assert.equal(gameController.state.statistics.rightAnswers, 1);
    });
    it(`should always stay static, if the answer is wrong`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 2,
        leftScreens: 1,
        statistics: {rightAnswers: 0}
      };
      const gameController = new GameController(state, null);
      gameController.changeState(false);
      assert.equal(gameController.state.statistics.rightAnswers, 0);
    });
  });
  describe(`#result`, () => {
    it(`should always be 'win', if there are no screens left and more then 0 mistakes left`, () => {
      const state = {
        questionType: `singer`,
        duration: 120,
        leftMistakes: 1,
        leftScreens: 1,
        statistics: {rightAnswers: 0},
        result: null
      };
      const gameController = new GameController(state, null);
      gameController.changeState(true);
      assert.equal(gameController.state.result, `win`);
    });
    it(`should always be 'loss', if there are no mistakes left`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 1,
        leftScreens: 1,
        statistics: {rightAnswers: 0},
        result: null
      };
      const gameController = new GameController(state, null);
      gameController.changeState(false);
      assert.equal(gameController.state.result, `loss`);
    });
  });
});
