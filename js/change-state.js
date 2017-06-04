const changeState = (state, isValidAnswer) => {
  const currentState = Object.assign({}, state, {
    game: state.game === `genre` ? `singer` : `genre`,
    leftMistakes: state.leftMistakes - (isValidAnswer ? 0 : 1),
    leftScreens: state.leftScreens - 1,
    statistics: {
      rightAnswers: state.statistics.rightAnswers + (isValidAnswer ? 1 : 0)
    }
  });

  if (!currentState.leftMistakes) {
    currentState.result = `loss`;
  } else if (!currentState.leftScreens) {
    currentState.result = `win`;
  }

  return currentState;
};

export default changeState;
