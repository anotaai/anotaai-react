import CrudService from '../CrudService'
import { updateProductList } from '../../actions/productActionCreator'

export default class ProductService extends CrudService {

    static getEndpoint() {
        return '/rest/produto';
    }

    static getProducts(name) {
        return dispatch => {
         

            return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/searchProdutosParaReceita?query=${name}`
            ).then(response => {
                return response.json();
            }).then(json => {
                dispatch(updateProductList(json));
            }).catch(error => {
                throw Error(error);
            });

        }
    }

}