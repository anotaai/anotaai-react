import CrudService from '../CrudService'
import { buildPhone } from '../../helpers/stringHelper'
import { createInstance } from '../../helpers/jsonHelper'
import { recommendEdition } from '../../actions/consumerActionCreator'
import  Toast  from '../../helpers/Toast'


export default class ClienteConsumidorService extends CrudService {


    static getEndpoint() {
        return '/rest/clienteconsumidor';
    }

    static getPhone(clienteConsumidor) {
        const telefone = clienteConsumidor.consumidor.usuario.telefone;
        const newUserInstance = createInstance(clienteConsumidor);
        newUserInstance.consumidor.usuario.telefone = buildPhone(telefone);
        return newUserInstance;
    }


     static findById(id, updateState) {

        return dispatch => {

            fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/${id}`
            ).then(response => {
              return response.json();
            }).then(json => {
                if(json.isValid) {
                  dispatch(updateState(json.entity));
               } else {
                  Toast.show(json.messages);
                  dispatch(recommendEdition(json.entity));
               }
            }).catch(error => {
                Toast.defaultError();
            });
        }

    }

 
}