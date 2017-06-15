import {history, initialState} from './data';

const changeState = (state, time, isValidAnswer) => {
  const gameTime = initialState.duration - time.minutes * 60 - time.seconds;

  const transitions = {
    genre: `singer`,
    singer: `genre`
  };

  const currentState = Object.assign({}, state, {
    questionType: transitions[state.questionType],
    leftMistakes: state.leftMistakes - (isValidAnswer ? 0 : 1),
    leftScreens: state.leftScreens - 1,
    statistics: Object.assign({}, state.statistics, {
      time: gameTime,
      rightAnswers: state.statistics.rightAnswers + (isValidAnswer ? 1 : 0)
    })
  });

  if (currentState.statistics.time === initialState.duration || !currentState.leftMistakes) {
    currentState.result = `loss`;
  } else if (!currentState.leftScreens) {
    currentState.result = `win`;
    currentState.statistics.comparison = findComparison(currentState);
  }

  return currentState;
};

const findComparison = (currentState) => {
  const statistics = history.slice();
  const myTime = currentState.statistics.time;
  const myRightAnswers = currentState.statistics.rightAnswers;

  const worseResults = statistics.filter((result) => {
    const rightAnswers = result.answers;

    return rightAnswers === myRightAnswers ? result.time > myTime : rightAnswers <= myRightAnswers;
  });

  return worseResults.length * 100 / statistics.length;
};

export default changeState;
