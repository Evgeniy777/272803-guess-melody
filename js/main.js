(function () {
  const LEFT_ARROW_KEY_CODE = 37;
  const RIGHT_ARROW_KEY_CODE = 39;

  const app = document.querySelector(`.app`);
  const template = document.querySelector(`#templates`).content;
  const screens = [...template.querySelectorAll(`.main`)];

  let currentIndex = screens.findIndex((screen) => screen.classList.contains(`main--welcome`));

  const showScreen = () => {
    app.replaceChild(screens[currentIndex], app.querySelector(`.main`));
  };
  showScreen();

  const changeIndex = (evt) => {
    if (evt.altKey) {
      switch (evt.keyCode) {
        case RIGHT_ARROW_KEY_CODE:
          currentIndex = currentIndex === screens.length - 1 ? 0 : currentIndex + 1;
          break;
        case LEFT_ARROW_KEY_CODE:
          currentIndex = currentIndex ? currentIndex - 1 : screens.length - 1;
      }
      showScreen();
    }
  };

  document.addEventListener(`keydown`, changeIndex);
})();
