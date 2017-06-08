import renderResultsScreen from './results-screen';
import renderFirstGameScreen from './first-game-screen';
import renderSecondGameScreen from './second-game-screen';

const checkResult = (state) => {
  if (state.result) {
    renderResultsScreen(state);
  } else if (state.questionType === `singer`) {
    renderFirstGameScreen(state);
  } else if (state.questionType === `genre`) {
    renderSecondGameScreen(state);
  }
};

export default checkResult;
