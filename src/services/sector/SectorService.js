import CrudService from '../CrudService'
import { updateSectorList } from '../../actions/groupProductActionCreator'



export default class SectorService extends CrudService {

    static getEndpoint() {
        return '/setor';
    }


    static getSectors() {
        return dispatch => {

            return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/recuperarSetor`
            ).then(json => {
                dispatch(updateSectorList(json));
            }).catch(error => {
                throw Error(error);
            });
        }
    }

}