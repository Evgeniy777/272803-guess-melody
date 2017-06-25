import ResultsScreenController from './results-screen';
import assert from 'assert';

describe(`comparison`, () => {
  it(`should always exist, if the game result is 'win'`, () => {
    const state = {
      questionType: `singer`,
      leftMistakes: 2,
      leftScreens: 0,
      statistics: {rightAnswers: 0, comparison: null},
      result: `win`
    };
    const resultsScreen = new ResultsScreenController(state);
    resultsScreen.findComparison(state);
    assert.notEqual(resultsScreen.state.statistics.comparison, null);
  });
  it(`should always stay null, if the game result is 'loss'`, () => {
    const state = {
      questionType: `singer`,
      leftMistakes: 0,
      leftScreens: 0,
      statistics: {rightAnswers: 0, comparison: null},
      result: `loss`
    };
    const resultsScreen = new ResultsScreenController(state);
    resultsScreen.findComparison(state);
    assert.strictEqual(resultsScreen.state.statistics.comparison, null);
  });
});
