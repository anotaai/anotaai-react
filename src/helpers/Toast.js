import { DEFAULT_TIME } from './constants';
//import T from 'i18n-react';
import { Icon } from '../domain/Icon';
import { MDText } from 'i18n-react';


export default class Toast {

    static show(message, icon, params) {
        let errorMessage = this.build('message.defaulterror', Icon.ERROR);
        if (message && Array.isArray(message)) {
            if (message.length > 0) {
                var _this = this;
                message.forEach(_message => {
                    _this.buildMessage(_message);
                });
            } else {
                this.buildMessage(errorMessage);
            }
        } else if (message.constructor === Object) {
            this.buildMessage(message);
        } else if (message.constructor == String) {
            if (icon) {
                let _message = this.build(message, icon, params);
                this.buildMessage(_message);
            } else {
                this.buildMessage(errorMessage);
            }
        } else {
            this.buildMessage(errorMessage);
        }
    }

    static buildMessage(message) {
        //var messageStr = message.isKey ? translateMessage(message.key, message.params) : message.text;
        const messageStr = this.translateMessage(message.key, message.params);
        const tipoMensagem = message.type;
        window.Materialize.toast(`<i class="material-icons left">${tipoMensagem.icon.className}</i>${messageStr}`, DEFAULT_TIME, tipoMensagem.type);
    }

    static build(key, icon, params) {
        return {
            type: {
                icon: icon, 
            },
            params: params,
            key: key
        };
    }

    static defaultError() {
        let mensagem = this.build('default.error', Icon.ERROR, null);
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