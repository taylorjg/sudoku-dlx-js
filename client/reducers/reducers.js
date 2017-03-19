import * as A from '../actions/actionTypes';
import { PUZZLE } from '../constants';

const initialState = {
    initialValues: PUZZLE,
    currentValues: PUZZLE,
    solving: false,
    drawingInterval: 50,
    timerId: null,
    queue: null
};

export default (state = initialState, action) => {

    // console.log(`action: ${JSON.stringify(action)}`);

    switch (action.type) {

        case A.START_SOLVING:
            return {
                ...state,
                currentValues: PUZZLE,
                solving: true,
                timerId: action.timerId,
                queue: action.queue
            };
            
        case A.CANCEL_SOLVING:
            return {
                ...state,
                solving: false,
                timerId: null,
                queue: null
            };
            
        case A.DRAW_PARTIAL_SOLUTION:
            return {
                ...state,
                currentValues: action.partialSolution
            };
            
        case A.DRAW_SOLUTION:
            return {
                ...state,
                currentValues: action.solution,
                solving: false,
                timerId: null,
                queue: null
            };

        default:
            return state;
    }
};
