export const gameData = Object.freeze({
  singer: {
    url: `/audio/Lordi - Hard Rock Hallelujah.mp3`,
    author: `Lordi`,
    answers: [
      {name: `Lordi`, src: `./img/lordi.jpg`},
      {name: `Филипп Киркоров`, src: `./img/philya.jpg`},
      {name: `Король и Шут`, src: `./img/gorshok.jpg`}
    ]
  },
  genre: {
    genre: `Рок`,
    answers: [
      {url: `/audio/Nickelback - Lullaby.mp3`, genre: `Рок`},
      {url: `/audio/Ed Sheeran - I See Fire (2013).mp3`, genre: `Поп`},
      {url: `/audio/Red Hot Chili Peppers - Under The Bridge.mp3`, genre: `Рок`},
      {url: `/audio/Dj Tiesto - In The Dark.mp3`, genre: `Транс`}
    ]
  }
});

export const initialState = Object.freeze({
  questionType: null,
  duration: 120,
  leftMistakes: 3,
  leftScreens: 10,
  statistics: {
    time: 0,
    points: 0,
    rightAnswers: 0,
    comparison: null
  },
  result: null
});

export const history = Object.freeze([
  {time: 32, answers: 10},
  {time: 50, answers: 7},
  {time: 20, answers: 10},
  {time: 20, answers: 8},
  {time: 44, answers: 10}
]);
