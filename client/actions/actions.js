import * as A from './actionTypes';
import { PUZZLE } from '../constants';
import { solve, rowIndicesToSolution } from '../solve';

export const startSolving = (timerId, queue) => ({
    type: A.START_SOLVING,
    timerId,
    queue
});

export const cancelSolving = () => ({
    type: A.CANCEL_SOLVING
});

export const finishSolving = () => ({
    type: A.FINISH_SOLVING
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
    (dispatch, getState) => {
        const state = getState();
        const queue = [];
        const timerId = setInterval(() => {
            const action = queue.shift();
            dispatch(action);
            if (action.type === A.DRAW_SOLUTION) {
                finishSolvingAsync();
            }
        }, state.drawingInterval);
        const onSearchStep = (internalRows, rowIndices) => {
            const partialSolution = rowIndicesToSolution(PUZZLE, internalRows, rowIndices);
            queue.push(drawPartialSolution(partialSolution));
        };
        const onSolutionFound = (internalRows, rowIndices) => {
            const solution = rowIndicesToSolution(PUZZLE, internalRows, rowIndices);
            queue.push(drawSolution(solution));
        };
        dispatch(startSolving(timerId, queue));
        const solutionGenerator = solve(PUZZLE, onSearchStep, onSolutionFound);
        solutionGenerator.next();
    };

export const cancelSolvingAsync = () =>
    (dispatch, getState) => {
        const state = getState();
        clearInterval(state.timerId);
        state.queue.splice(0);
        dispatch(cancelSolving());
    };

export const finishSolvingAsync = () =>
    (dispatch, getState) => {
        const state = getState();
        clearInterval(state.timerId);
        state.queue.splice(0);
        dispatch(finishSolving());
    };
