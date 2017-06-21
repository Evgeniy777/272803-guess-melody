import showScreen from '../show-screen';
import renderMainScreen from '../welcome-screen/welcome-screen';
import ResultsScreen from './results-screen-view';

const renderResultsScreen = (state) => {
  const resultsScreen = new ResultsScreen(state);

  resultsScreen.replayHandler = renderMainScreen;

  showScreen(resultsScreen.element);
};

export default renderResultsScreen;
