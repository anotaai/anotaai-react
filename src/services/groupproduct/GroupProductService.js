import CrudService from '../CrudService'

export default class GroupProductService extends CrudService {

    static getEndpoint() {
        return '/rest/grupoproduto';
    }

}