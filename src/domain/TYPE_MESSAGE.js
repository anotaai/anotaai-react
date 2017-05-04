import { DataType } from './DataType';
import { ICON } from './ICON';

export class TYPE_MESSAGE extends DataType {

    constructor(ordinal, key, className, icon) {
        super(ordinal, key);
        this.className = className;
    }

}

TYPE_MESSAGE.SUCCESS = new TYPE_MESSAGE(0, 'SUCCESS', 'green darken-2', ICON.DONE);
TYPE_MESSAGE.INFO = new TYPE_MESSAGE(1, 'INFO', 'Indigo', ICON.INFO);
TYPE_MESSAGE.WARNING = new TYPE_MESSAGE(2, 'WARNING', 'yellow darken-2', ICON.WARNING);
TYPE_MESSAGE.ERROR = new TYPE_MESSAGE(3, 'ERROR', 'red darken-2', ICON.ERROR);
