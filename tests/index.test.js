const { assert } = require('chai');
const solveMaze = require('../index');
const data = require('./data/index.data');

describe(solveMaze.name, () => {
  describe('Should return a valid way', () => {
    data.validHasExit.forEach((el) => {
      it(`Params: ${JSON.stringify({ start: el.start, end: el.end })}`, () => {
        const actualResult = solveMaze(el.maze, el.start, el.end);

        assert.deepEqual(actualResult, el.expectedResult);
      });
    });
  });

  describe(solveMaze.name, () => {
    describe('Should return false and empty way', () => {
      data.validNoWayOut.forEach((el) => {
        it(`Params: ${JSON.stringify({ start: el.start, end: el.end })}`, () => {
          const actualResult = solveMaze(el.maze, el.start, el.end);
  
          assert.deepEqual(actualResult, el.expectedResult);
        });
      });
    });
  });
  

  describe('Should throw an error because of wrong input parameters', () => {
    data.invalid.forEach((el) => {
      it(`Params: ${JSON.stringify({ start: el.start, end: el.end })}`, () => {
        const cb = () => solveMaze(el.maze, el.start, el.end);

        if (el.expectedResult instanceof Error) {
          assert.throws(cb, el.expectedResult.message);
        } else {
          const actualResult = cb();

          assert.deepEqual(actualResult, el.expectedResult);
        }
      });
    });
  });


  describe('Should throw an error because maze is not array or empty', () => {
    data.invalid2.forEach((el) => {
      it(`Params: ${JSON.stringify({ start: el.start, end: el.end })}`, () => {
        const cb = () => solveMaze(el.maze, el.start, el.end);

        if (el.expectedResult instanceof Error) {
          assert.throws(cb, el.expectedResult.message);
        } else {
          const actualResult = cb();

          assert.deepEqual(actualResult, el.expectedResult);
        }
      });
    });
  });
});
