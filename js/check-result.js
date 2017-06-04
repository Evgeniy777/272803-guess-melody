import renderResultsScreen from './results-screen';

const checkResult = (state, callback) => {
  if (state.result) {
    renderResultsScreen(state);
  } else {
    callback(state);
  }
};

export default checkResult;
