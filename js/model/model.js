class AbstractModel {
  get urlRead() {
    throw Error(`Abstract method. Define URL for model`);
  }

  get urlWrite() {
    throw Error(`Abstract method. Define URL for model`);
  }

  get initialState() {
    throw Error(`Abstract method. Define initial state for model`);
  }

  load() {
    return fetch(this.urlRead)
      .then((resp) => resp.json());
  }
}

export default class Model extends AbstractModel {
  get urlRead() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/questions`;
  }
  get urlWrite() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/stats/:Andron`;
  }

  get initialState() {
    return {
      duration: 120,
      leftMistakes: 3,
      questionNumber: 0,
      questions: null,
      statistics: {
        time: 0,
        points: 0,
        rightAnswers: 0,
        comparison: null
      },
      result: null
    };
  }

  get state() {
    if (!this._state) {
      this._state = this.initialState;
    }
    return this._state;
  }

  set state(state) {
    this._state = state;
  }

  load() {
    return super.load()
      .then((data) => {
        this.state.questions = data;
      });
  }

  resetState() {
    this.state = this.initialState;
    this.load();
  }

  changeState(isValidAnswer) {
    const statistics = this.state.statistics;
    const currentState = Object.assign({}, this.state, {
      leftMistakes: this.state.leftMistakes - (isValidAnswer ? 0 : 1),
      questionNumber: this.state.questionNumber + 1,
      statistics: Object.assign({}, statistics, {
        rightAnswers: statistics.rightAnswers + (isValidAnswer ? 1 : 0)
      })
    });

    if (currentState.statistics.time === currentState.duration || !currentState.leftMistakes) {
      currentState.result = `loss`;
    } else if (currentState.questionNumber === this.state.questions.length) {
      currentState.result = `win`;
    }

    this.state = currentState;

    return this.state;
  }

  changeTime(time) {
    const gameTime = this.state.duration - time;

    this.state = Object.assign({}, this.state, {
      statistics: Object.assign({}, this.state.statistics, {
        time: gameTime
      })
    });

    return this.state;
  }
}
