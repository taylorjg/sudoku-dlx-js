import { DataObject } from './dataObject';
import { ColumnObject } from './columnObject';

export default function* (matrix) {
    const root = buildInternalStructure(matrix);
    const searchData = new SearchData(root);
    yield* search(searchData);
};

const buildInternalStructure = matrix => {

    const root = new ColumnObject();
    const colIndexToListHeader = new Map();

    matrix.forEach((row, rowIndex) => {
        let firstDataObjectInThisRow = null;
        row.forEach((col, colIndex) => {
            if (rowIndex === 0) {
                const listHeader = new ColumnObject();
                root.appendColumnHeader(listHeader);
                colIndexToListHeader.set(colIndex, listHeader);
            }
            if (col) {
                const listHeader = colIndexToListHeader.get(colIndex);
                const dataObject = new DataObject(listHeader, rowIndex);
                if (firstDataObjectInThisRow)
                    firstDataObjectInThisRow.appendToRow(dataObject);
                else
                    firstDataObjectInThisRow = dataObject;
            }
        });
    });

    return root;
};

function* search(searchData) {
    if (searchData.isEmpty()) {
        if (searchData.currentSolution.length) {
            yield searchData.currentSolution.slice().sort();
            return;
        }
    }
    
    const c = chooseColumnWithLeastRows(searchData);
    coverColumn(c);
    for (let r = c.down; r !== c; r = r.down) {
        searchData.pushRowIndex(r.rowIndex);
        for (let j = r.right; j !== r; j = j.right) coverColumn(j.listHeader);
        yield* search(searchData);
        for (let j = r.left; j !== r; j = j.left) uncoverColumn(j.listHeader);
        searchData.popRowIndex();
    }
    uncoverColumn(c);
}

const chooseColumnWithLeastRows = searchData => {
    let chosenColumn = null;
    for (let columnHeader = searchData.root.nextColumnObject; columnHeader !== searchData.root; columnHeader = columnHeader.nextColumnObject) {
        if (!chosenColumn || columnHeader.numberOfRows < chosenColumn.numberOfRows) {
            chosenColumn = columnHeader;
        }
    }
    return chosenColumn;
};

const coverColumn = c => {
    c.unlinkColumnHeader();
    for (let i = c.down; i !== c; i = i.down) {
        for (let j = i.right; j !== i; j = j.right) {
            j.listHeader.unlinkDataObject(j);
        }
    }
};

const uncoverColumn = c => {
    for (let i = c.up; i !== c; i = i.up) {
        for (let j = i.left; j !== i; j = j.left) {
            j.listHeader.relinkDataObject(j);
        }
    }
    c.relinkColumnHeader();
};

class SearchData {

    constructor(root) {
        this.root = root;
        this.currentSolution = [];
    }

    isEmpty() {
        return this.root.nextColumnObject === this.root;
    }

    pushRowIndex(rowIndex) {
        this.currentSolution.push(rowIndex);
    }

    popRowIndex() {
        this.currentSolution.pop();
    }
};
