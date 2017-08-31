import CrudService from '../CrudService'
import { createInstance } from '../../helpers/jsonHelper'

export default class SaleService extends CrudService {

    static getEndpoint() {
        return '/venda'
    }

    static setSaleType(sale) {
        const newInstance = createInstance(sale);

        if(newInstance.consumidor.id !== null) {
            newInstance.type = 'A_VISTA_CONSUMIDOR';
        } else {
            newInstance.typeSaleList.forEach(typeSale => {
                 if(typeSale.checked) {
                    newInstance.type =  typeSale.type;
                 }
            });
        }

        return newInstance;
    }
}
