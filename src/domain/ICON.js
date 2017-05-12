import { DataType } from './DataType'

export class Icon extends DataType {

    constructor(ordinal, type, className) {
        super(ordinal, type);
        this.className = className;
    }

}

Icon.DONE = new Icon(0, 'DONE', 'done');
Icon.INFO = new Icon(1, 'INFO', 'info');
Icon.WARNING = new Icon(2, 'WARNING', 'warning');
Icon.ERROR = new Icon(3, 'ERROR', 'done');
