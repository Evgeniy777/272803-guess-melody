import ResultsController from './results-contoller';
import assert from 'assert';

describe(`ResultsScreenController`, () => {
  describe(`#findComparison()`, () => {
    it(`should add comparison if player wins'`, () => {
      const state = {
        answers: 10,
        time: 120,
        result: `win`
      };
      const resultsScreen = new ResultsController(state);
      resultsScreen.findComparison();
      assert(resultsScreen.state.comparison);
    });
    it(`should not add comparison if player loses'`, () => {
      const state = {
        answers: 10,
        time: 120,
        result: `loss`
      };
      const resultsScreen = new ResultsController(state);
      resultsScreen.findComparison(state);
      assert(!resultsScreen.state.comparison);
    });
  });
});
