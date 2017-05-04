import { DataType } from './DataType'

export class ICON extends DataType {

    constructor(ordinal, type, className) {
        super(ordinal, type);
        this.className = className;
    }

}

ICON.DONE = new ICON(0, 'DONE', 'done');
ICON.INFO = new ICON(1, 'INFO', 'info');
ICON.WARNING = new ICON(2, 'WARNING', 'warning');
ICON.ERROR = new ICON(3, 'ERROR', 'error');
