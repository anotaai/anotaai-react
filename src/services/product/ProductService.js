import CrudService from '../CrudService' 

export default class ProductService extends CrudService {

    static getEndpoint() {
        return '/rest/produto';
    }

}