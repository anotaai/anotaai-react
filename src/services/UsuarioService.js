import ShowMessage from '../helpers/ShowMessage'
import { toastError, toastDefaultTime, urlBackend } from '../helpers/constants'


export default class UsuarioService {

    static save(usuario) {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ usuario: usuario }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };
        return fetch(`${urlBackend}/rest/usuarios/`, requestInfo)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
                ShowMessage.show('Ocorreu um erro ao incluir o usuário', toastError);
            })

    }

}