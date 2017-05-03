import { TOAST, DEFAULT_TIME,TYPE_MESSAGE} from './constants'
 

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
            case TYPE_MESSAGE.ERROR:
                window.Materialize.toast(`<i class="material-icons left">error</i>${messageStr}`, DEFAULT_TIME, TOAST.ERROR);
                break;
            case TYPE_MESSAGE.SUCCESS:
                window.Materialize.toast(`<i class="material-icons left">done</i>${messageStr}`, DEFAULT_TIME, TOAST.SUCCESS);
                break;
            case TYPE_MESSAGE.INFO:
                window.Materialize.toast(`<i class="material-icons left">info</i>${messageStr}`, DEFAULT_TIME, TOAST.INFO);
                break;
            case TYPE_MESSAGE.WARNING:
                window.Materialize.toast(`<i class="material-icons left">warning</i>${messageStr}`, DEFAULT_TIME, TOAST.WARNING);
                break;
            default:
                window.Materialize.toast(`<i class="material-icons left">error</i>${messageStr}`, DEFAULT_TIME, TOAST.ERROR );
        }
    }

}