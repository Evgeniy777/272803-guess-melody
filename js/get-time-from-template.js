const getTimeFromTemplate = (gameScreen) => {
  const minutes = parseInt(gameScreen.querySelector(`.timer-value-mins`).textContent, 10);
  const seconds = parseInt(gameScreen.querySelector(`.timer-value-secs`).textContent, 10);

  return {minutes, seconds};
};

export default getTimeFromTemplate;
