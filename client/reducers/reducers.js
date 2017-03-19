import * as A from '../actions/actionTypes';
import { PUZZLE } from '../constants';

const initialState = {
    initialValues: PUZZLE,
    currentValues: PUZZLE,
    solving: false
};

export default (state = initialState, action) => {
    console.log(`action: ${JSON.stringify(action)}`);
    switch (action.type) {

        case A.START_SOLVING:
            return { ...state, currentValues: PUZZLE, solving: true };
            
        case A.PARTIAL_SOLUTION:
            return { ...state, currentValues: action.partialSolution };
            
        case A.SOLUTION:
            return { ...state, currentValues: action.solution, solving: false };

        default:
            return state;
    }
};
