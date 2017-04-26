import { urlBackend} from '../helpers/constants'
import { buildTelefone } from '../helpers/stringHelper'


export default class UsuarioService {

    static save(usuario, telefoneStr) {

        usuario.telefone = buildTelefone(telefoneStr);

  
        return fetch(`${urlBackend}/rest/usuarios`, {
            method: 'POST',
            body: JSON.stringify({ nome: usuario.nome, email: usuario.email , senha: usuario.senha , telefone: usuario.telefone }),
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