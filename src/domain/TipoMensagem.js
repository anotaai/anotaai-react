import { DataType } from './DataType';
import { ICON } from './ICON';

export class TipoMensagem extends DataType {

    constructor(ordinal, type, className, icon) {
        super(ordinal, type);
        this.className = className;
        this.icon = icon;
    }

}

TipoMensagem.SUCCESS = new TipoMensagem(0, 'SUCCESS', 'green darken-2', ICON.DONE);
TipoMensagem.INFO = new TipoMensagem(1, 'INFO', 'Indigo', ICON.INFO);
TipoMensagem.WARNING = new TipoMensagem(2, 'WARNING', 'yellow darken-2', ICON.WARNING);
TipoMensagem.ERROR = new TipoMensagem(3, 'ERROR', 'red darken-2', ICON.ERROR);
