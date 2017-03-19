import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import App from './containers/App';
import solve from '../dlxlib';

const puzzle = [
    "8        ",
    "  36     ",
    " 7  9 2  ",
    " 5   7   ",
    "    457  ",
    "   1   3 ",
    "  1    68",
    "  85   1 ",
    " 9    4  "
];

const ROWS = Array.from(Array(9).keys());
const COLS = Array.from(Array(9).keys());
const DIGITS = Array.from(Array(9).keys()).map(n => n + 1);

const buildInternalRows = puzzle => {
    const seqs = ROWS.map(row =>
        COLS.map(col => {
            const coords = { row, col };
            const initialValue = lookupInitialValue(puzzle, row, col);
            return buildInternalRowsForCell(coords, initialValue);
        }));
    return flatten(flatten(seqs));
};

const flatten = xss => xss.reduce((acc, xs) => acc.concat(xs), []);

const lookupInitialValue = (puzzle, row, col) => Number(puzzle[row][col]);

const buildInternalRowsForCell = (coords, initialValue) => {
    return initialValue
        ? [{ coords, value: initialValue, isInitialValue: true }]
        : DIGITS.map(digit => ({ coords, value: digit, isInitialValue: false }));
};

const buildDlxRows = internalRows => internalRows.map(internalRow => buildDlxRow(internalRow));

const buildDlxRow = internalRow => {
    const { row, col } = internalRow.coords;
    const value = internalRow.value;
    const box = rowColToBox(row, col);
    const posVals = encode(row, col);
    const rowVals = encode(row, value - 1);
    const colVals = encode(col, value - 1);
    const boxVals = encode(box, value - 1);
    const result = posVals.concat(rowVals, colVals, boxVals);
    return result;
};

const rowColToBox = (row, col) => Math.floor(row - (row % 3) + (col / 3));

const encode = (major, minor) => {
    const result = Array(81).fill(0);
    result[major * 9 + minor] = 1;
    return result;
};

const internalRows = buildInternalRows(puzzle);
const dlxRows = buildDlxRows(internalRows);

const gen = solve(dlxRows);
const solution = gen.next().value;

const v1 = solution.map(rowIndex => internalRows[rowIndex]);
v1.sort((a, b) => {
    const row1 = a.coords.row;
    const col1 = a.coords.col;
    const row2 = b.coords.row;
    const col2 = b.coords.col;
    const n1 = row1 * 9 + col1;
    const n2 = row2 * 9 + col2;
    return n1 - n2;
});
const v2 = Array(81).fill(' ');
v1.forEach(ir => {
    const { row, col } = ir.coords;
    v2[row * 9 + col] = ir.value;
});
const v3 = v2.join('');
const v4 = [0, 1, 2, 3, 4, 5, 6, 7, 8].reduce((acc, n) => {
    acc.push(v3.substr(n * 9, 9));
    return acc;
}, []);

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <App solution={v4} />
  </Provider>,
  document.getElementById('root')
);
