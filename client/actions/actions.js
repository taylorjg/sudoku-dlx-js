import * as A from './actionTypes';
import { PUZZLE } from '../constants';
import { solve, rowIndicesToSolution } from '../solve';

export const startSolving = () => ({
    type: A.START_SOLVING
});

export const drawPartialSolution = partialSolution => ({
    type: A.DRAW_PARTIAL_SOLUTION,
    partialSolution
});

export const drawSolution = solution => ({
    type: A.DRAW_SOLUTION,
    solution
});

export const startSolvingAsync = () =>
    dispatch => {
        const queue = [];
        const timerId = setInterval(() => {
            const action = queue.shift();
            dispatch(action);
            if (action.type === A.DRAW_SOLUTION) {
                clearInterval(timerId);
            }
        }, 50);
        const onSearchStep = (internalRows, rowIndices) => {
            const partialSolution = rowIndicesToSolution(PUZZLE, internalRows, rowIndices);
            queue.push(drawPartialSolution(partialSolution));
        };
        const onSolutionFound = (internalRows, rowIndices) => {
            const solution = rowIndicesToSolution(PUZZLE, internalRows, rowIndices);
            queue.push(drawSolution(solution));
        };
        dispatch(startSolving());
        solve(PUZZLE, onSearchStep, onSolutionFound);
    };
