import React, { PropTypes } from 'react';
import * as C from '../constants';

const Cell = ({
    value,
    isInitialValue
}) => {
    const conditionalAttributes = {};
    if (isInitialValue) {
        conditionalAttributes.className = 'initialValue';
    }
    return (
        <div {...conditionalAttributes}>{value}</div>
    );
};

Cell.propTypes = {
    value: PropTypes.string.isRequired,
    isInitialValue: PropTypes.bool.isRequired
};

export default Cell;
