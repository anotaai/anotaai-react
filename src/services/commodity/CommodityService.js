import CrudService from '../CrudService'
import { PAGE_SIZE } from '../../helpers/constants'
import AsyncService from '../AsyncService'

export default class CommodityService extends CrudService {

    static getEndpoint() {
        return '/entradamercadoria';
    }


    static list(offset, name, dataEntrada, component) {
        return AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}?start=${offset}&max=${PAGE_SIZE}&nome=${name}&dataEntrada=${dataEntrada}`, [component]);
    }


    static getCommodityForDelete(id, updateState) {

        return dispatch => {

            fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/getCommodityForDelete/${id}`
            ).then(json => {
                dispatch(updateState(json.entity));
            }).catch(error => {
                console.log('ERRO [services\\commodity\\CommodityService.js 26]');
            });
        }
    }

    static rejectCommodity(entity, component) {
        return new Promise((resolve, reject) => {

            let atLeastOneRejectCommodity = false;
            entity.itens.forEach(item => {
                if (item.estornar) {
                    atLeastOneRejectCommodity = true;
                }
            });

            if (!atLeastOneRejectCommodity) {
                reject('at.least.one.reject.commodity');

            } else {
                AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/rejectCommodity`, [component], {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(entity)
                }).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            }
        });
    }
}