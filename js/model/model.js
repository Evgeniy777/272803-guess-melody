class DefaultAdapter {
  toServer() {
    throw Error(`Abstract method. Define toServer method`);
  }
}

const defaultAdapter = new class extends DefaultAdapter {
  toServer(data) {
    return JSON.stringify(data);
  }
}();

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

  save(params, adapter = defaultAdapter) {
    const settings = {
      body: adapter.toServer(params),
      headers: {
        'Content-type': `application/json`
      },
      method: `POST`
    };
    return fetch(this.urlWrite, settings);
  }
}

export default class Model extends AbstractModel {
  get urlRead() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/questions`;
  }
  get urlWrite() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/stats/Andrey272803`;
  }

  get initialState() {
    return {
      duration: 120,
      leftMistakes: 3,
      questionNumber: 0,
      questions: null,
      game: {
        rightAnswers: 0,
        result: null,
        statistics: {
          time: 0,
          answers: 0
        }
      },
      history: null
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

  loadStatistics() {
    return fetch(this.urlWrite)
      .then((data) => data.json())
      .then((data) => {
        this.state.history = data;
      });
  }

  resetState() {
    this.state = this.initialState;
    this.load();
  }

  changeState(isValidAnswer) {
    const game = this.state.game;
    const statistics = game.statistics;
    const currentState = Object.assign({}, this.state, {
      leftMistakes: this.state.leftMistakes - (isValidAnswer ? 0 : 1),
      questionNumber: this.state.questionNumber + 1,
      game: Object.assign({}, game, {
        rightAnswers: game.rightAnswers + (isValidAnswer ? 1 : 0),
        statistics: Object.assign({}, statistics, {
          answers: statistics.answers + (isValidAnswer ? 1 : 0)
        })
      })
    });

    if (currentState.game.statistics.time === currentState.duration || !currentState.leftMistakes) {
      currentState.game.result = `loss`;
    } else if (currentState.questionNumber === currentState.questions.length) {
      currentState.game.result = `win`;
    }

    this.state = currentState;

    return this.state;
  }

  changeTime(time) {
    const gameTime = this.state.duration - time;

    this.state.game = Object.assign({}, this.state.game, {
      statistics: Object.assign({}, this.state.game.statistics, {
        time: gameTime
      })
    });

    return this.state;
  }

  findComparison() {
    const statistics = this.state.history.slice();
    const myStatistics = this.state.game.statistics;
    const myTime = parseInt(myStatistics.time, 10);
    const myRightAnswers = parseInt(myStatistics.answers, 10);

    const worseResults = statistics.filter((result) => {
      const rightAnswers = parseInt(result.answers, 10);

      return rightAnswers === myRightAnswers ? parseInt(result.time, 10) > myTime : rightAnswers < myRightAnswers;
    });

    this.state.game.comparison = Math.floor(worseResults.length * 100 / statistics.length);

    return this.state.game.comparison;
  }
}
