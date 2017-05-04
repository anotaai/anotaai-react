import { DEFAULT_TIME } from './constants'
import { TYPE_MESSAGE } from '../domain/TYPE_MESSAGE'


export default class ShowMessage {

    static showMessage(key, typeMessage) {
        this.buildMessage({ key: 'message.defaulterror', type: typeMessage, params: null });
    }

    static showMessages(messages) {
        if (messages && messages.length > 0) {
            messages.forEach(message => {
                this.setMessage(message);
            });
        } else {
            this.buildMessage({ key: 'message.defaulterror', type: TYPE_MESSAGE.ERROR, params: null });
        }
    }

    buildMessage(message) {
        //var messageStr = message.isKey ? translateMessage(message.key, message.params) : message.text;
        const messageStr = this.translateMessage(message.key, message.params);
        const tipoMensagem = message.type;
        window.Materialize.toast(`<i class="material-icons left">${tipoMensagem.icon.className}</i>${messageStr}`, DEFAULT_TIME, tipoMensagem.toString());
    }

    translateMessage(key, params) {
		var message = '';//TODO - recuperar mensagem
		if (params && params.length > 0) {//TODO aplicar parametros
			params.forEach(param => {
				console.log(param);
			});
		}
		return message;
	}

}