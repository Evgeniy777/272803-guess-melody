import {API_URL} from '../constants';

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
  get getDataUrl() {
    throw Error(`Abstract method. Define URL for model`);
  }

  get statsUrl() {
    throw Error(`Abstract method. Define URL for model`);
  }

  get initialState() {
    throw Error(`Abstract method. Define initial state for model`);
  }

  load() {
    return fetch(this.getDataUrl)
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
    return fetch(this.statsUrl, settings);
  }
}

export default class Model extends AbstractModel {
  get getDataUrl() {
    return `${API_URL}/questions`;
  }
  get statsUrl() {
    return `${API_URL}/stats/Andrey272803`;
  }

  get initialState() {
    return {
      duration: 120,
      leftMistakes: 3,
      questionNumber: 0,
      questions: null,
      prevAnswerTime: 0,
      statistics: {
        rightAnswers: 0,
        result: null,
        time: 0,
        answers: 0
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
    return fetch(this.statsUrl)
      .then((data) => data.json())
      .then((data) => {
        this.state.history = data;
      });
  }

  resetState() {
    this.state = this.initialState;
    return this.load();
  }

  changeState(isValidAnswer) {
    const statistics = this.state.statistics;
    const currentState = Object.assign({}, this.state, {
      leftMistakes: this.state.leftMistakes - (isValidAnswer ? 0 : 1),
      questionNumber: this.state.questionNumber + 1,
      prevAnswerTime: statistics.time,
      statistics: Object.assign({}, statistics, {
        rightAnswers: statistics.rightAnswers + (isValidAnswer ? 1 : 0)
      })
    });
    if (isValidAnswer) {
      currentState.statistics.answers = statistics.answers + (currentState.prevAnswerTime - this.state.prevAnswerTime < 10 ? 2 : 1);
    }

    if (currentState.statistics.time === currentState.duration || !currentState.leftMistakes) {
      currentState.statistics.result = `loss`;
    } else if (currentState.questionNumber === currentState.questions.length) {
      currentState.statistics.result = `win`;
    }

    this.state = currentState;

    return this.state;
  }

  changeTime(time) {
    const gameTime = this.state.duration - time;

    this.state.statistics = Object.assign({}, this.state.statistics, {
      time: gameTime
    });

    return this.state;
  }
}
