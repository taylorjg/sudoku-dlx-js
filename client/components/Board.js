import React, { PropTypes } from 'react';
import Cell from './Cell';
import * as C from '../constants';

const Board = ({
    initialValues,
    currentValues
}) => {
    const cells = rowIndex =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8].map(colIndex =>
            <td key={rowIndex * 9 + colIndex}>
                <Cell
                    value={currentValues[rowIndex][colIndex]}
                    isInitialValue={!!Number(initialValues[rowIndex][colIndex])}
                />
            </td>
        );
    return (
        <div>
            <table id="board">
                <tbody>
                    <tr>{cells(0)}</tr>
                    <tr>{cells(1)}</tr>
                    <tr>{cells(2)}</tr>
                    <tr>{cells(3)}</tr>
                    <tr>{cells(4)}</tr>
                    <tr>{cells(5)}</tr>
                    <tr>{cells(6)}</tr>
                    <tr>{cells(7)}</tr>
                    <tr>{cells(8)}</tr>
                </tbody>
            </table>
        </div>
    );
};

Board.propTypes = {
    initialValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentValues: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Board;
