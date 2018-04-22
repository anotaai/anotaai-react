import CrudService from '../CrudService'
import { MAP_SALE_URLS, TYPE_SALE, LOCAL_SALE } from '../../helpers/constants'
import AsyncService from '../AsyncService'

export default class SaleService extends CrudService {

    static getEndpoint() {
        return '/venda'
    }

    static save(entity, component) {
        const saleUrl = MAP_SALE_URLS.get(entity.type);
        let tipoVenda = entity.venda;
        switch (entity.type) {
            case TYPE_SALE.A_VISTA_ANONIMA:
                
                break;
            case TYPE_SALE.A_VISTA_CONSUMIDOR:

                break;
            case TYPE_SALE.ANOTADA_CONSUMIDOR:
                tipoVenda.folhaCadernetaVenda = {}
                tipoVenda.folhaCadernetaVenda.type = LOCAL_SALE.FOLHA_CADERNETA;
                tipoVenda.folhaCadernetaVenda.folhaCaderneta = entity.folhaCaderneta;
                tipoVenda.folhaCadernetaVenda.venda = {};
                tipoVenda.folhaCadernetaVenda.venda.produtos = entity.produtosSelecionados;
                tipoVenda.type = entity.type;
                break;
        
            default:
                break;
        }

        return AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}${saleUrl}`, [component], {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(tipoVenda)
        });
    }

    
}
