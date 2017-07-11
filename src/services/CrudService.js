import { PAGE_SIZE } from '../helpers/constants'
import Toast from '../helpers/Toast'
import AsyncService from './AsyncService'

export default class CrudService {



    static findById(id, updateState) {

        return dispatch => {

            fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/${id}`
            ).then(response => {
                return response.json();
            }).then(json => {
                dispatch(updateState(json.entity));
            }).catch(error => {
                Toast.defaultError();
            });
        }
    }

    static remove(id) {
        return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/${id}`, {
            method: 'DELETE'
        }).then(response => {
            return response.json();
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