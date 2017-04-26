import {urlBackend } from '../helpers/constants'
import { buildTelefone } from '../helpers/stringHelper'

export default class ClientService {
  
    static save(cliente,usuario,telefoneStr) {
       
       
        usuario.telefone = buildTelefone(telefoneStr);
        const cpf =   cliente.cpf.replace(/[^\d]+/g,'');  
        const currentCep =  cliente.endereco.cep;
        cliente.endereco.cep = currentCep.replace(/[^\d]+/g,'');  

        fetch(`${urlBackend}/rest/clientes/`,{
            method: 'POST',
            body: JSON.stringify({type:'cliente', nomeComercial:cliente.nomeComercial,cpf:cpf,endereco:cliente.endereco,usuario: usuario}),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw Error(response);
        })
        .catch(error => {
           throw Error(error);
        });
    }

}