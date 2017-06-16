import Timer from './timer-view';
import {initialState} from '../data';
import showScreen from '../show-screen';
import renderResultsScreen from '../results-screen/results-screen';

const renderTimerScreen = () => {
  const timer = new Timer(initialState);
  timer.finishGame = () => renderResultsScreen(Object.assign({}, initialState, {result: `loss`}));

  showScreen(timer.element);
};

export default renderTimerScreen;
