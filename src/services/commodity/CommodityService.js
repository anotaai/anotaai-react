import CrudService from '../CrudService'
import { PAGE_SIZE } from '../../helpers/constants'
import AsyncService from '../AsyncService'
import Toast from '../../helpers/Toast'

export default class  CommodityService extends CrudService {

     static getEndpoint() {
        return '/entradamercadoria';
     }


     static list(offset, name, dataEntrada, component) {
        return AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}?start=${offset}&max=${PAGE_SIZE}&nome=${name}&dataEntrada=${dataEntrada}`, [component]);
    }


     static deleteCommodity(id, updateState) {

        return dispatch => {

            fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/deleteCommodity/${id}`
            ).then(response => {
                return response.json();
            }).then(json => {
                dispatch(updateState(json.entity));
            }).catch(error => {
                Toast.defaultError();
            });
        }
    }

}