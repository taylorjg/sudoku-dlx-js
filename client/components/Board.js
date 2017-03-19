import React, { PropTypes } from 'react';
import Cell from './Cell';

const INDICES = Array.from(Array(9).keys());

const Board = ({
    initialValues,
    currentValues
}) => {
    const rowOfCells = rowIndex =>
        INDICES.map(colIndex =>
            <td key={rowIndex * 9 + colIndex}>
                <Cell
                    value={currentValues[rowIndex][colIndex]}
                    isInitialValue={!!Number(initialValues[rowIndex][colIndex])}
                />
            </td>
        );
    return (
        <table id="board">
            <tbody>
                <tr>{rowOfCells(0)}</tr>
                <tr>{rowOfCells(1)}</tr>
                <tr>{rowOfCells(2)}</tr>
                <tr>{rowOfCells(3)}</tr>
                <tr>{rowOfCells(4)}</tr>
                <tr>{rowOfCells(5)}</tr>
                <tr>{rowOfCells(6)}</tr>
                <tr>{rowOfCells(7)}</tr>
                <tr>{rowOfCells(8)}</tr>
            </tbody>
        </table>
    );
};

Board.propTypes = {
    initialValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentValues: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Board;
