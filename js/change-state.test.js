import changeState from './change-state';
import assert from 'assert';

describe(`changeState`, () => {
  it(`next state object is not equal to the initial state object`, () => {
    const state = {
      questionType: `singer`,
      leftMistakes: 3,
      leftScreens: 10,
      statistics: {rightAnswers: 0}
    };
    const nextState = changeState(state, {minutes: 2, seconds: 0}, true);
    assert.notEqual(nextState, state);
  });
  describe(`questionType`, () => {
    it(`should always change the game screen, while the game goes on`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 3,
        leftScreens: 10,
        statistics: {rightAnswers: 0}
      };
      const nextState = changeState(state, {minutes: 2, seconds: 0}, true);
      assert.equal(nextState.questionType, `genre`);

      const state1 = {
        questionType: `genre`,
        leftMistakes: 3,
        leftScreens: 10,
        statistics: {rightAnswers: 0}
      };
      const nextState1 = changeState(state1, {minutes: 0, seconds: 1}, false);
      assert.equal(nextState1.questionType, `singer`);
    });
  });
  describe(`leftMistakes`, () => {
    it(`should always be decremented, if the answer is wrong`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 3,
        leftScreens: 10,
        statistics: {rightAnswers: 0}
      };
      const nextState = changeState(state, {minutes: 2, seconds: 0}, false);
      assert.equal(nextState.leftMistakes, 2);
    });
    it(`should always stay static, if the answer is correct`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 3,
        leftScreens: 10,
        statistics: {rightAnswers: 0}
      };
      const nextState = changeState(state, {minutes: 2, seconds: 0}, true);
      assert.equal(nextState.leftMistakes, 3);
    });
    it(`if becomes 0, the game always finishes`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 1,
        leftScreens: 8,
        statistics: {rightAnswers: 0}
      };
      const nextState = changeState(state, {minutes: 2, seconds: 0}, false);
      assert.equal(nextState.result, `loss` || `win`);
    });
  });
  describe(`leftScreens`, () => {
    it(`should always be decremented, whether the answer is wrong or correct`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 3,
        leftScreens: 10,
        statistics: {rightAnswers: 0}
      };
      const nextState = changeState(state, {minutes: 2, seconds: 0}, true);
      assert.equal(nextState.leftScreens, 9);

      const nextState1 = changeState(state, {minutes: 2, seconds: 0}, false);
      assert.equal(nextState1.leftScreens, 9);
    });
    it(`if becomes 0, the game always finishes`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 2,
        leftScreens: 1,
        statistics: {rightAnswers: 0}
      };
      const nextState = changeState(state, {minutes: 2, seconds: 0}, false);
      assert.notEqual(nextState.result, `loss` || `win`);
    });
  });
  describe(`rightAnswers`, () => {
    it(`should always be incremented, if the answer is correct`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 2,
        leftScreens: 1,
        statistics: {rightAnswers: 0}
      };
      const nextState1 = changeState(state, {minutes: 2, seconds: 0}, true);
      assert.equal(nextState1.statistics.rightAnswers, 1);
    });
    it(`should always stay static, if the answer is wrong`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 2,
        leftScreens: 1,
        statistics: {rightAnswers: 0}
      };
      const nextState = changeState(state, {minutes: 2, seconds: 0}, false);
      assert.equal(nextState.statistics.rightAnswers, 0);
    });
  });
  describe(`result`, () => {
    it(`should always be 'win', if there are no screens left and more then 0 mistakes left`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 1,
        leftScreens: 1,
        statistics: {rightAnswers: 0},
        result: null
      };
      const nextState = changeState(state, {minutes: 1, seconds: 0}, true);
      assert.equal(nextState.result, `win`);
    });
    it(`should always be 'loss', if there are no mistakes left`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 1,
        leftScreens: 1,
        statistics: {rightAnswers: 0},
        result: null
      };
      const nextState = changeState(state, {minutes: 1, seconds: 0}, false);
      assert.equal(nextState.result, `loss`);
    });
    it(`should always be 'loss', if there is no time left`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 1,
        leftScreens: 1,
        statistics: {time: 0, rightAnswers: 0},
        result: null
      };
      const nextState = changeState(state, {minutes: 0, seconds: 0}, true);
      assert.equal(nextState.result, `loss`);
    });
  });
  describe(`time`, () => {
    it(`should always increase, while the left time is going down`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 2,
        leftScreens: 2,
        statistics: {time: 0, rightAnswers: 0}
      };
      const nextState = changeState(state, {minutes: 1, seconds: 0}, false);
      const nextState1 = changeState(state, {minutes: 0, seconds: 30}, true);
      assert(nextState1.statistics.time > nextState.statistics.time);
    });
  });
  describe(`comparison`, () => {
    it(`should always exist, if the game result is 'win'`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 2,
        leftScreens: 1,
        statistics: {rightAnswers: 0, comparison: null},
        result: null
      };
      const nextState = changeState(state, {minutes: 1, seconds: 0}, true);
      assert.notEqual(nextState.statistics.comparison, null);
    });
    it(`should always stay null, if the game result is 'loss'`, () => {
      const state = {
        questionType: `singer`,
        leftMistakes: 1,
        leftScreens: 1,
        statistics: {rightAnswers: 0, comparison: null},
        result: null
      };
      const nextState = changeState(state, {minutes: 1, seconds: 0}, false);
      assert.strictEqual(nextState.statistics.comparison, null);
    });
  });
});
