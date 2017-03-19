import * as A from './actionTypes';
import { PUZZLE } from '../constants';
import { solve, rowIndicesToSolution } from '../solve';

const onSearchStep = (internalRows, rowIndices) => {
    const partialSolution = rowIndicesToSolution(PUZZLE, internalRows, rowIndices);
    console.log(`[onSearchStep] partial solution: ${JSON.stringify(partialSolution)}`);
};

export const startSolving = () => {
    solve(PUZZLE, onSearchStep);
    return {
        type: A.START_SOLVING
    }
};

export const partialSolution = partialSolution => ({
    type: A.PARTIAL_SOLUTION,
    partialSolution
});

export const solution = solution => ({
    type: A.SOLUTION,
    solution
});
