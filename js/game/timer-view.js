import AbstractView from '../abstract-view';
import animationObj from '../animate';

export default class TimerView extends AbstractView {
  constructor(duration) {
    super();
    this.duration = duration;
  }

  get template() {
    return `
    <section class="main main--level">
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
        </circle>
    
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">0${Math.floor(this.duration / 60)}</span>
          <span class="timer-value-dots">:</span>
          <span class="timer-value-secs">0${this.duration % 60}</span>
        </div>
        <div class="main-wrap"></div>
      </svg>
    </section>
    `;
  }

  initializeCountdown() {
    const element = this.element.querySelector(`.timer-line`);
    const radius = parseInt(element.getAttributeNS(null, `r`), 10);
    const timer = this.element.querySelector(`.timer-value`);

    const countDown = animationObj.animate(animationObj.getAnimation(0, 1000, this.duration), (animation) => {
      this.redrawCircle(element, radius, animation);
      this.redrawTimer(timer, animation);
      this.changeState(this.getTime());
    }, () => {
      timer.classList.add(`timer-value--finished`);
      this.finishGame();
    });
    this.stopTimer = countDown;

    return countDown;
  }

  redrawCircle(circle, radius, animation) {
    const length = 2 * Math.PI * radius;
    const stepLength = length / animation.steps;
    const lengthToClear = stepLength * animation.step;

    circle.setAttributeNS(null, `r`, radius);
    circle.setAttributeNS(null, `stroke-dasharray`, length.toString());
    circle.setAttributeNS(null, `stroke-dashoffset`, lengthToClear.toString());

    return circle;
  }

  redrawTimer(timer, animation) {
    const total = animation.stepDuration * animation.steps;
    const passed = animation.stepDuration * animation.step;
    const timeLeft = this.formatTime(total, passed);

    timer.querySelector(`.timer-value-mins`).textContent = this.addLeadingZero(timeLeft.minutes);
    timer.querySelector(`.timer-value-secs`).textContent = this.addLeadingZero(timeLeft.seconds);

    return timer;
  }

  formatTime(total, passed) {
    const minutesLeft = Math.floor((total - passed) / 60 / 1000);
    const secondsLeft = (total - passed - minutesLeft * 60 * 1000) / 1000;

    return {
      minutes: minutesLeft,
      seconds: secondsLeft
    };
  }

  getTime() {
    const minutes = parseInt(this.element.querySelector(`.timer-value-mins`).textContent, 10);
    const seconds = parseInt(this.element.querySelector(`.timer-value-secs`).textContent, 10);

    return minutes * 60 + seconds;
  }

  addLeadingZero(val) {
    return val < 10 ? `0${val}` : val;
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.initializeCountdown();
    }
    return this._element;
  }

  finishGame() {

  }

  changeState() {

  }

  stopTimer() {

  }
}
