import { DataType } from './DataType';
import { Icon } from './Icon';

export class TipoMensagem extends DataType {

    constructor(ordinal, type, className, icon) {
        super(ordinal, type);
        this.className = className;
        this.icon = icon;
    }

}

TipoMensagem.SUCCESS = new TipoMensagem(0, 'SUCCESS', 'green darken-2', Icon.DONE);
TipoMensagem.INFO = new TipoMensagem(1, 'INFO', 'Indigo', Icon.INFO);
TipoMensagem.WARNING = new TipoMensagem(2, 'WARNING', 'yellow darken-2', Icon.WARNING);
TipoMensagem.ERROR = new TipoMensagem(3, 'ERROR', 'red darken-2', Icon.ERROR);
