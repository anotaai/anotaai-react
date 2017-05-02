import { toastInfo, toastError, toastWarning, toastSuccess, defaultTime } from './constants'

export default class ShowMessage {



    static show(message, type) {

        if (message.anotaaiExceptionMessages) {

            message.anotaaiExceptionMessages.forEach(message => {
                ShowMessage.setMessage(message)
            });

        } else {
            window.Materialize.toast(message, defaultTime, type);
        }

    }


    static setMessage(message) {

        //var messageStr = message.isKey ? translateMessage(message.key, message.params) : message.text;
        var messageStr = message.key;
        var tipoMensagem = message.type;
        switch (tipoMensagem.type) {
            case 'ERROR':
                window.Materialize.toast(messageStr, defaultTime, toastError);
                break;
            case 'SUCCESS':
                window.Materialize.toast(messageStr, defaultTime, toastSuccess);
                break;
            case 'INFO':
                window.Materialize.toast(messageStr, defaultTime, toastInfo);
                break;
            case 'WARNING':
                window.Materialize.toast(messageStr, defaultTime, toastWarning);
                break;
            default:
                window.Materialize.toast(messageStr, defaultTime, toastError);
        }
    }

}