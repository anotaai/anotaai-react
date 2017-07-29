import React from 'react';
import { Icon } from '../domain/Icon';
import { toast } from 'react-toastify';
 

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
        } else if (message.constructor === String) {
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

       switch(message.type.type) {
        case 'ERROR' : {
            toast.error(<div><font className="toast-text">{messageStr}</font></div>);
            break;
        }
        case 'INFO' : {
            toast.info(<div><font className="toast-text">{messageStr}</font></div>);
            break;
        }
        case 'SUCCESS' : {
            toast.success(<div><font className="toast-text">`${messageStr}`</font></div>);
            break;
        }
        case 'WARNING' : {
            toast.warn(<div><font className="toast-text">{messageStr}</font></div>);
            break;
        }
        case 'SUCCESS' : {
            toast.success(<div><font className="toast-text">{messageStr}</font></div>);
            break;
        }

         default:  toast.info(<div><font className="toast-text">{messageStr}</font></div>);;
       }
       
    
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
        let mensagem = this.build('message.defaulterror', Icon.ERROR, null);
        this.buildMessage(mensagem);
    }

    static translateMessage(key, params) {
        let T = require('i18n-react');
        return T.default.translate(key, params);
    }

}