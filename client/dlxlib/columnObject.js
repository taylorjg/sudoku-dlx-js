import { DataObject } from './dataObject';

export class ColumnObject extends DataObject {

    constructor() {
        super(null, -1);
        this.previousColumnObject = this;
        this.nextColumnObject = this;
        this.numberOfRows = 0;
    }

    appendColumnHeader(columnObject) {
        this.previousColumnObject.nextColumnObject = columnObject;
        columnObject.nextColumnObject = this;
        columnObject.previousColumnObject = this.previousColumnObject;
        this.previousColumnObject = columnObject;
    }

    unlinkColumnHeader() {
        this.nextColumnObject.previousColumnObject = this.previousColumnObject;
        this.previousColumnObject.nextColumnObject = this.nextColumnObject;
    }

    relinkColumnHeader() {
        this.nextColumnObject.previousColumnObject = this;
        this.previousColumnObject.nextColumnObject = this;
    }

    addDataObject(dataObject) {
        this.appendToColumn(dataObject);
        this.numberOfRows++;
    }

    unlinkDataObject(dataObject) {
        dataObject.unlinkFromColumn();
        this.numberOfRows--;
    }

    relinkDataObject(dataObject) {
        dataObject.relinkIntoColumn();
        this.numberOfRows++;
    }
}
