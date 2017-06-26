import Application from './application';
import assert from 'assert';

describe(`Application`, () => {
  describe(`.serialize()`, () => {
    it(`should always return a string`, () => {
      const queryString = Application.serialize({controller: `result`, params: {time: 234, answers: 38, result: `win`}});
      assert.equal(typeof queryString, `string`);
    });
    it(`should return an empty string, if it gets no data`, () => {
      const queryString = Application.serialize({controller: ``, params: {}});
      assert.strictEqual(queryString, ``);
    });
  });

  describe(`.deserialize()`, () => {
    it(`should return an object with controller and params properties`, () => {
      const state = Application.deserialize(`#result?time=34&answers=62`);
      assert.deepStrictEqual(Object.keys(state), [`controller`, `params`]);
    });
    it(`should return no data if it gets an empty string`, () => {
      const state = Application.deserialize(``);
      assert.deepStrictEqual(state, {
        controller: ``,
        params: {}
      });
    });
    it(`should return no params if there is no "?" in a string`, () => {
      const state = Application.deserialize(`#somethingverybadtime=34&answers=62`);
      assert.deepStrictEqual(state, {
        controller: `somethingverybadtime=34&answers=62`,
        params: {}
      });
    });
    it(`should return several params if there ar 1 or several "&" in a string`, () => {
      const state = Application.deserialize(`#result?time=34&answers=62`);
      assert.deepStrictEqual(state, {
        controller: `result`,
        params: {
          time: `34`,
          answers: `62`
        }
      });
    });
  });
});
