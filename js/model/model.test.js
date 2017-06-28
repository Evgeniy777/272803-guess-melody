import Model from './model';
import assert from 'assert';

describe(`Model#changeState()`, () => {
  it(`next state object is not equal to the initial state object`, () => {
    const model = new Model();
    model.state.questions = [{}, {}, {}, {}, {}];
    model.changeState(true);
    assert.notEqual(model.state, model.initialState);
  });
  describe(`leftMistakes`, () => {
    it(`should always be decremented, if the answer is wrong`, () => {
      const model = new Model();
      model.state.questions = [{}, {}, {}, {}, {}];
      model.changeState(false);
      assert.equal(model.state.leftMistakes, 2);
    });
    it(`should always stay static, if the answer is correct`, () => {
      const model = new Model();
      model.state.questions = [{}, {}, {}, {}, {}];
      model.changeState(true);
      assert.equal(model.state.leftMistakes, 3);
    });
    it(`if becomes 0, the game always finishes`, () => {
      const model = new Model();
      model.state = Object.assign({}, model.initialState, {
        duration: 120,
        leftMistakes: 1,
        questionNumber: 0,
        statistics: {
          rightAnswers: 0
        },
        questions: [{}, {}, {}, {}, {}]
      });
      model.changeState(false);
      assert.notStrictEqual(model.state.result, null);
    });
  });
  describe(`questionNumber`, () => {
    it(`should always be incremented, whether the answer is wrong or correct`, () => {
      const model = new Model();
      model.state.questions = [{}, {}, {}, {}, {}];
      model.changeState(true);
      assert.equal(model.state.questionNumber, 1);

      model.changeState(false);
      assert.equal(model.state.questionNumber, 2);
    });
    it(`if becomes equal to data length, the game always finishes`, () => {
      const model = new Model();
      model.state = Object.assign({}, model.initialState, {
        duration: 120,
        leftMistakes: 2,
        questionNumber: 4,
        statistics: {
          rightAnswers: 0
        },
        result: null,
        questions: [{}, {}, {}, {}, {}]
      });
      model.changeState(false);
      assert.notStrictEqual(model.state.result, null);
    });
  });
  describe(`rightAnswers`, () => {
    it(`should always be incremented, if the answer is correct`, () => {
      const model = new Model();
      model.state.questions = [{}, {}, {}, {}, {}];
      model.changeState(true);
      assert.equal(model.state.statistics.rightAnswers, 1);
    });
    it(`should always stay static, if the answer is wrong`, () => {
      const model = new Model();
      model.state.questions = [{}, {}, {}, {}, {}];
      model.changeState(false);
      assert.equal(model.state.statistics.rightAnswers, 0);
    });
  });
  describe(`result`, () => {
    it(`should always be 'win', if there are no questions left and more then 0 mistakes left`, () => {
      const model = new Model();
      model.state = Object.assign({}, model.initialState, {
        duration: 120,
        leftMistakes: 1,
        questionNumber: 4,
        statistics: {
          rightAnswers: 0
        },
        result: null,
        questions: [{}, {}, {}, {}, {}]
      });
      model.changeState(true);
      assert.equal(model.state.result, `win`);
    });
    it(`should always be 'loss', if there are no mistakes left`, () => {
      const model = new Model();
      model.state = Object.assign({}, model.initialState, {
        duration: 120,
        leftMistakes: 1,
        questionNumber: 4,
        statistics: {
          rightAnswers: 0
        },
        result: null,
        questions: [{}, {}, {}, {}, {}]
      });
      model.changeState(false);
      assert.equal(model.state.result, `loss`);
    });
  });
});
