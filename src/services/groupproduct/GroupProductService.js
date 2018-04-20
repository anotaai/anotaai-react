import CrudService from '../CrudService'


export default class GroupProductService extends CrudService {

    static getEndpoint() {
        return '/grupoproduto';
    }

     static getGroups(name,updateGroupProductList) {
        
        return dispatch => {

            return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/recuperarPorNome?nome=${name}`
            ).then(json => {
                dispatch(updateGroupProductList(json));
            }).catch(error => {
                throw Error(error);
            });

        }
    }


}