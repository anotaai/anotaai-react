import { DEFAULT_TIME } from './constants';
import { TipoMensagem } from '../domain/TipoMensagem';
//import T from 'i18n-react';
import { Icon } from '../domain/Icon';
import { MDText } from 'i18n-react';


export default class ShowMessage {

    static showMessages(messages) {
        if (messages && messages.length > 0) {
            var _this = this;
            messages.forEach(message => {
                _this.buildMessage(message);
            });
        } else {
            this.buildMessage({ key: 'message.defaulterror', type: { icon: Icon.ERROR, type: Icon.ERROR.type}, params: null });
        }
    }

    static buildMessage(message) {
        //var messageStr = message.isKey ? translateMessage(message.key, message.params) : message.text;
        const messageStr = this.translateMessage(message.key, message.params);
        const tipoMensagem = message.type;
        const className =  tipoMensagem.icon.className.split('-');
        let materialIcon;
    
        if(className.length > 1) {
            materialIcon = className[1];
        } else {
            materialIcon = className[0];
        }
        
        window.Materialize.toast(`<i class="material-icons left">${materialIcon}</i>${messageStr}`, DEFAULT_TIME,tipoMensagem.type);
    }

    static build(key, icon, params) {
        return {
            type: {
                icon: icon, type: icon.type
            },
            params: params,
            key: key
        };
    }

    static success(key) {
      let mensagem = this.build(key, Icon.DONE,null);
      this.buildMessage(mensagem);
    }

    static warning(key) {
      let mensagem = this.build(key, Icon.WARNING,null);
      this.buildMessage(mensagem);
    }

    static error() {
        let mensagem = this.build('default.error', Icon.ERROR,null);
        this.buildMessage(mensagem);
    }

    static translateMessage(key, params) {
        //let T = new MDText();
        //let x = T.translate("nome");
		var message = '';//TODO - recuperar mensagem
		if (params && params.length > 0) {//TODO aplicar parametros
			params.forEach(param => {
				console.log(param);
			});
		}
		return key;
	}

}