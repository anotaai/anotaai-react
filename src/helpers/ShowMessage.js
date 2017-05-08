import { DEFAULT_TIME } from './constants';
import { TipoMensagem } from '../domain/TipoMensagem';
//import T from 'i18n-react';
import { MDText } from 'i18n-react';


export default class ShowMessage {

    static showMessages(messages) {
        if (messages && messages.length > 0) {
            var _this = this;
            messages.forEach(message => {
                _this.buildMessage(message);
            });
        } else {
            this.buildMessage({ key: 'message.defaulterror', type: TipoMensagem.ERROR, params: null });
        }
    }

    static buildMessage(message) {
        //var messageStr = message.isKey ? translateMessage(message.key, message.params) : message.text;
        const messageStr = this.translateMessage(message.key, message.params);
        const tipoMensagem = message.type;
        window.Materialize.toast(`<i class="material-icons left">${tipoMensagem.icon.className}</i>${messageStr}`, DEFAULT_TIME, tipoMensagem.type);
    }

    static 
    translateMessage(key, params) {
        let T = new MDText();
        let x = T.translate("nome");
        console.log(x);
		var message = '';//TODO - recuperar mensagem
		if (params && params.length > 0) {//TODO aplicar parametros
			params.forEach(param => {
				console.log(param);
			});
		}
		return message;
	}

}