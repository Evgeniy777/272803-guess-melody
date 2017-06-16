import WelcomeScreen from './welcome-screen-view';
import showScreen from '../show-screen';
import renderTimerScreen from '../timer/timer-controller';
import renderGameScreen from '../question/question';
import {initialState} from '../data';
import SingerQuestionScreen from '../question/singer-question-view';
import {gameData} from '../data';

const renderMainScreen = () => {
  const welcomeScreen = new WelcomeScreen();

  welcomeScreen.startGameHandler = () => {
    renderTimerScreen();
    renderGameScreen(initialState, new SingerQuestionScreen(initialState, gameData));
  };

  showScreen(welcomeScreen.element);
};

export default renderMainScreen;
