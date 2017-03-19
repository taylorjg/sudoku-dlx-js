import * as A from './actionTypes';
import * as C from '../constants';

export const showSolution = solution => ({
    type: A.SHOW_SOLUTION,
    solution
});
