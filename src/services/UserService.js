import { urlBackend} from '../helpers/constants'
import { buildPhone } from '../helpers/stringHelper'


export default class UserService {

    static save(usuario, telefoneStr) {
        
        usuario.telefone = buildPhone(telefoneStr);

        return fetch(`http://localhost:8080/rest/usuarios`, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: new Headers({
                'Content-type': 'application/json'})
            })
            .then(response => {
                if (!response.ok) {
                   return response.json();
                }
                throw Error(response);
            })
            .catch(error => {
              throw Error(error);
            });

    }

}