const app = document.querySelector(`.app`);
const showScreen = (screen) => {
  app.replaceChild(screen, app.querySelector(`.main`));
};

export default showScreen;
