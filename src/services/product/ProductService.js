import CrudService from '../CrudService';
import { updateProductList } from '../../actions/productActionCreator';
import { createInstance } from '../../helpers/jsonHelper';
import { getDayForEnum } from '../../helpers/stringHelper';

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

    static getAvailableDays(product) {
       
       const newProductInstance = createInstance(product);
       const diasDisponibilidade = [];
       
       product.diasDisponibilidade.forEach(day => {
          diasDisponibilidade.push({dia: getDayForEnum(day)});   
       });
       
       newProductInstance.diasDisponibilidade = diasDisponibilidade;

       return newProductInstance;
    }

}