import CrudService from '../CrudService'
import { updateSectorList } from '../../actions/groupProductActionCreator'

export default class SectorService extends CrudService {

    static getEndpoint() {
        return '/rest/setor';
    }


     static getSectors() {
        return dispatch => {

            return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/setor/recuperarSetor`
            ).then(response => {
                return response.json();
            }).then(json => {
               dispatch(updateSectorList(json));
            }).catch(error => {
                throw Error(error);
            });

        }

    }

}