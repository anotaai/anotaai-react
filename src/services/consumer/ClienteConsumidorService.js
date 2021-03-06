import CrudService from '../CrudService'
import { buildPhone } from '../../helpers/stringHelper'
import { createInstance } from '../../helpers/jsonHelper'
import { activateRecommendEdition } from '../../actions/consumerActionCreator'
import  Toast  from '../../helpers/Toast'


export default class ClienteConsumidorService extends CrudService {


    static getEndpoint() {
        return '/clienteconsumidor';
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
            ).then(json => {
                if(json.isValid) {
                  dispatch(updateState(json.entity));
               } else {
                  Toast.show(json.messages);
                  dispatch(activateRecommendEdition(json.entity));
               }
            }).catch(error => {
                console.log('ERRO [services\\consumer\\ClienteConsumidorService.js 36]');
            });
        }

    }

    static recommendEdition(clienteConsumidor) {

        return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/usuario/recomendaredicao`, {
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(clienteConsumidor),
            method: 'POST'
        }).catch(error => {
            throw Error(error);
        });
    }

    static getConsumers(name, updateConsumerList) {
        return dispatch => {
            return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/getconsumersbyname?query=${name}`
            ).then(resoponse => {
                dispatch(updateConsumerList(resoponse.list.itens));
            }).catch(error => {
                throw Error(error);
            });
        }
    }
}