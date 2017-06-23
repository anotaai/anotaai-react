import { PAGE_SIZE } from '../helpers/constants'
import Toast from '../helpers/Toast'

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

    static list(offset, name) {
        return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}?start=${offset}&max=${PAGE_SIZE}&nome=${name}`
        ).then(response => {
            return response.json();
        }).catch(error => {
            throw Error(error);
        });
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

    static save(entity) {
        return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(entity)
        }).then(response => {
            return response.json();
        }).catch(error => {
            throw Error(error);
        });
    }

    static update(entity) {
        return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/${entity.id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(entity)
        }).then(response => {
            return response.json();
        }).catch(error => {
            throw Error(error);
        });
    }

}