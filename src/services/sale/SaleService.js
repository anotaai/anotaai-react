import CrudService from '../CrudService'
import { MAP_SALE_URLS, TYPE_SALE } from '../../helpers/constants'
import AsyncService from '../AsyncService'

export default class SaleService extends CrudService {

    static getEndpoint() {
        return '/venda'
    }

    static save(entity,component) {

        if(entity.folhaCaderneta.folhaCaderneta.consumidor.consumidor.nome !== '' &&  
           entity.type === TYPE_SALE.A_VISTA_ANONIMA) {
             entity.type = TYPE_SALE.A_VISTA_CONSUMIDOR;
        }

        const saleUrl = MAP_SALE_URLS.get(entity.type);

        return AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}${saleUrl}`, [component], {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(entity)
        });
    }

    
}
