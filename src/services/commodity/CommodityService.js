import CrudService from '../CrudService'
import { PAGE_SIZE } from '../../helpers/constants'
import AsyncService from '../AsyncService'

export default class  CommodityService extends CrudService {

     static getEndpoint() {
        return '/rest/entradamercadoria';
     }


     static list(offset, name, dataEntrada, component) {
        return AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}?start=${offset}&max=${PAGE_SIZE}&nome=${name}&dataEntrada=${dataEntrada}`, [component]);
    }

}