import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import App from './containers/App';
import * as C from './constants';
import solve from '../dlxlib';

const INDICES = Array.from(Array(9).keys());
const ROWS = INDICES;
const COLS = INDICES;
const DIGITS = INDICES.map(n => n + 1);

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

const rowIndicesToSolution = (puzzle, internalRows, rowIndices) => {
    const solutionInternalRows = rowIndices.map(rowIndex => internalRows[rowIndex]);
    solutionInternalRows.sort((a, b) => {
        const ar = a.coords.row;
        const ac = a.coords.col;
        const br = b.coords.row;
        const bc = b.coords.col;
        const n1 = ar * 9 + ac;
        const n2 = br * 9 + bc;
        return n1 - n2;
    });
    const values = C.PUZZLE.slice();
    solutionInternalRows.forEach(internalRow => {
        const { row, col } = internalRow.coords;
        values[row * 9 + col] = internalRow.value;
    });
    return INDICES.reduce((acc, n) => {
        acc.push(values.slice(n * 9, n * 9 + 9).join(''));
        return acc;
    }, []);
};

const internalRows = buildInternalRows(C.PUZZLE);
const dlxRows = buildDlxRows(internalRows);
const solutionGenerator = solve(dlxRows);
const solutionRowIndices = solutionGenerator.next().value;
const solution = rowIndicesToSolution(C.PUZZLE, internalRows, solutionRowIndices);

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <App solution={solution} />
    </Provider>,
    document.getElementById('root')
);
