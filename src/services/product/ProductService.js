import CrudService from '../CrudService';
import { createInstance } from '../../helpers/jsonHelper';
import { getDayForEnum, concatDot } from '../../helpers/stringHelper';

export default class ProductService extends CrudService {

    static getEndpoint() {
        return '/produto';
    }

    static getProducts(name,updateProductList,insumoFilter) {
        return dispatch => {

            return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/searchProdutosParaReceita?query=${name}&insumoFilter=${insumoFilter}`).then(json => {
                dispatch(updateProductList(json));
            }).catch(error => {
                throw Error(error);
            });
        }
    }

    static setJson(product) {
       
       const newProductInstance = createInstance(product);
       const diasDisponibilidade = [];
       
       product.diasDisponibilidade.forEach(day => {
          diasDisponibilidade.push({dia: getDayForEnum(day)});   
       });
       
       newProductInstance.diasDisponibilidade = diasDisponibilidade;
       newProductInstance.precoVenda = concatDot(newProductInstance.precoVenda);

       return newProductInstance;
    }

}