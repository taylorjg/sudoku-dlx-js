import * as A from '../actions/actionTypes';
import { PUZZLE } from '../constants';

const initialState = {
    initialValues: PUZZLE,
    currentValues: PUZZLE
};

export default (state = initialState, action) => {
    console.log(`action: ${JSON.stringify(action)}`);
    switch (action.type) {

        case A.SHOW_SOLUTION:
            return { ...state, currentValues: action.solution};
            
        default:
            return state;
    }
};
