import { PAGE_SIZE } from '../helpers/constants'
import AsyncService from './AsyncService'

export default class CrudService {



    static findById(id, updateState) {

        return dispatch => {

            fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/${id}`
            ).then(json => {
                dispatch(updateState(json.entity));
            }).catch(error => {
                console.log('ERRO [services\\CrudService.js 17]');
            });
        }
    }

    static remove(id) {
        return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/${id}`, {
            method: 'DELETE'
        }).catch(error => {
            throw Error(error);
        });
    }


    static list(offset, name, component) {
        return AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}?start=${offset}&max=${PAGE_SIZE}&nome=${name}`, [component]);
    }

    

    static save(entity,component) {

        return AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}`, [component], {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(entity)
        });
    }

    static update(entity,component) {

        return AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/${entity.id}`, [component], {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(entity)
        });
    }

}