export const gameData = Object.freeze({
  singer: {
    url: null,
    author: `Пелагея`,
    answers: [
      {
        name: `Пелагея`,
        src: `./img/pelageya.jpg`
      },
      {
        name: `Филипп Киркоров`,
        src: `./img/philya.jpg`
      },
      {
        name: `Король и Шут`,
        src: `./img/gorshok.jpg`
      }
    ]
  },
  genre: {
    url: null,
    genre: `Рок`,
    answers: [
      {
        url: null,
        genre: `Рок`
      },
      {
        url: null,
        genre: `Поп`
      },
      {
        url: null,
        genre: `Рок`
      },
      {
        url: null,
        genre: `Транс`
      }
    ]
  }
});

export const initialState = Object.freeze({
  game: null,
  leftTime: 120000,
  leftMistakes: 3,
  leftScreens: 10,
  statistics: {
    points: 0,
    rightAnswers: 0,
    comparison: null
  },
  result: null
});
