import { DataType } from './DataType'

export class TOAST extends DataType {

    constructor(ordinal, key, className) {
        super(ordinal, key);
        this.className = className;
    }

}

TOAST.SUCCESS = new TOAST(1, 'SUCCESS', 'green darken-2');
TOAST.INFO = new TOAST(0, 'INFO', 'Indigo');
TOAST.WARNING = new TOAST(1, 'WARNING', 'yellow darken-2');
TOAST.ERROR = new TOAST(1, 'ERROR', 'red darken-2');
