import CrudService from '../CrudService'
import { updateSectorList } from '../../actions/groupProductActionCreator'

export default class GroupProductService extends CrudService {

    static getEndpoint() {
        return '/rest/grupoproduto';
    }

    static getSectors(name) {
        return dispatch => {

            return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/setor/recuperarPorNome?nome=${name}`
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