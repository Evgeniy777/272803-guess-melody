import changeState from '../change-state';
import getTimeFromTemplate from '../get-time-from-template';
import SingerQuestionScreen from '../question/singer-question-view';
import GenreQuestionScreen from '../question/genre-question-view';
import renderResultsScreen from '../results-screen/results-screen';
import {gameData} from '../data';

const renderGameScreen = (currentState) => {
  const gameScreen = document.querySelector(`.main--level`);
  const transitions = {
    genre: GenreQuestionScreen,
    singer: SingerQuestionScreen
  };
  const questionScreen = new transitions[currentState.questionType](currentState, gameData);

  const checkResult = (state) => {
    if (state.result) {
      renderResultsScreen(state);
    } else {
      renderGameScreen(state);
    }
  };

  questionScreen.checkAnswer = (isValidAnswer) => checkResult(changeState(currentState, getTimeFromTemplate(gameScreen), isValidAnswer));

  gameScreen.replaceChild(questionScreen.element, document.querySelector(`.main-wrap`));
};

export default renderGameScreen;
