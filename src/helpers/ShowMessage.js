import { TOAST_INFO, TOAST_ERROR, TOAST_WARNING, TOAST_SUCCESS, DEFAULT_TIME, 
TYPE_MESSAGE_ERROR, TYPE_MESSAGE_SUCCESS, TYPE_MESSAGE_INFO, TYPE_MESSAGE_WARNING } from './constants'
 

export default class ShowMessage {

    static show(message, type) {

        if (message.anotaaiExceptionMessages) {
            message.anotaaiExceptionMessages.forEach(message => {
                ShowMessage.setMessage(message);
            });
        } else {
            ShowMessage.setMessage({key:message,type:{type:type}});
        }

    }


    static setMessage(message) {

        //var messageStr = message.isKey ? translateMessage(message.key, message.params) : message.text;
        const messageStr = message.key;
        const tipoMensagem = message.type;
        switch (tipoMensagem.type) {
            case TYPE_MESSAGE_ERROR:
                window.Materialize.toast(`<i class="material-icons left">error</i>${messageStr}`, DEFAULT_TIME, TOAST_ERROR);
                break;
            case TYPE_MESSAGE_SUCCESS:
                window.Materialize.toast(`<i class="material-icons left">done</i>${messageStr}`, DEFAULT_TIME, TOAST_SUCCESS);
                break;
            case TYPE_MESSAGE_INFO:
                window.Materialize.toast(`<i class="material-icons left">info</i>${messageStr}`, DEFAULT_TIME, TOAST_INFO);
                break;
            case TYPE_MESSAGE_WARNING:
                window.Materialize.toast(`<i class="material-icons left">warning</i>${messageStr}`, DEFAULT_TIME, TOAST_WARNING);
                break;
            default:
                window.Materialize.toast(`<i class="material-icons left">error</i>${messageStr}`, DEFAULT_TIME, TOAST_ERROR);
        }
    }

}