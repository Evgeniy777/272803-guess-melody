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
      const resultsController = new ResultsController(null, state);
      resultsController.findComparison();
      assert(resultsController.state.comparison);
    });
    it(`should not add comparison if player loses'`, () => {
      const state = {
        answers: 10,
        time: 120,
        result: `loss`
      };
      const resultsController = new ResultsController(null, state);
      resultsController.findComparison(state);
      assert(!resultsController.state.comparison);
    });
  });
});
