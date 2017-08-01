import React from 'react';
import { Icon } from '../domain/Icon';
import { toast } from 'react-toastify';
 
function createMarkup(e) {
  return {__html: e};
}

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

    static showTag(messageStr) {
        return <font className="toast-text"><div dangerouslySetInnerHTML={createMarkup(messageStr)}/></font>;
    }

    static buildMessage(message) {
        //var messageStr = message.isKey ? translateMessage(message.key, message.params) : message.text;
        const messageStr = this.translateMessage(message.key, message.params);

       switch(message.type.type) {
        case 'ERROR': {
            toast.error(this.showTag(messageStr));
            break;
        }
        case 'INFO': {
            toast.info(this.showTag(messageStr));
            break;
        }
        case 'SUCCESS': {
            toast.success(this.showTag(messageStr));
            break;
        }
        case 'WARNING': {
            toast.warn(this.showTag(messageStr));
            break;
        }
       
         default:  
            toast.error(this.showTag(messageStr));;
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