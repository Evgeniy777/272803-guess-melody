import getElementFromTemplate from './get-element-from-template';

const getGameScreen = (state) => {
  const screenTemplate = () => `
    <section class="main main--level">
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
        </circle>
    
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">0${Math.floor(state.duration / 60)}</span>
          <span class="timer-value-dots">:</span>
          <span class="timer-value-secs">0${state.duration % 60}</span>
        </div>
        <div class="main-wrap"></div>
      </svg>
    </section>
`;

  return getElementFromTemplate(screenTemplate(state));
};

export default getGameScreen;
