import CrudService from '../CrudService'

export default class Sector extends CrudService {

    static getEndpoint() {
        return '/rest/setor';
    }
}