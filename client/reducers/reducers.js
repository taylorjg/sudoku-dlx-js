import * as A from '../actions/actionTypes';

const initialState = {
    initialValues: [
        "8        ",
        "  36     ",
        " 7  9 2  ",
        " 5   7   ",
        "    457  ",
        "   1   3 ",
        "  1    68",
        "  85   1 ",
        " 9    4  "
    ],
    currentValues: [
        "8        ",
        "  36     ",
        " 7  9 2  ",
        " 5   7   ",
        "    457  ",
        "   1   3 ",
        "  1    68",
        "  85   1 ",
        " 9    4  "
    ]
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
