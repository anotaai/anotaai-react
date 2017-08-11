import CrudService from '../CrudService'


export default class AppointmentBookService extends CrudService {

    static getEndpoint() {
        return '/caderneta';
    }

}