import CrudService from '../CrudService'
import { MAP_SALE_URLS, TYPE_SALE, LOCAL_SALE } from '../../helpers/constants'
import AsyncService from '../AsyncService'

export default class SaleService extends CrudService {

    static getEndpoint() {
        return '/venda'
    }

    static initSale(caderneta, redirectSaleProduct, components) {
        return dispatch => {
            AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/initsale`, components, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(caderneta)
            }).then(venda => {
                dispatch(redirectSaleProduct(venda.entity));
            });
        }
    }

    static addItemVenda(itemVenda, components) {
        return new Promise((resolve, reject) => {
            AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/addproduct`, components, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(itemVenda)
            }).then(response => {
                resolve(response);
            });
        });
    }

    static addConsumer(folhaCadernetaVenda, components) {
        return new Promise((resolve, reject) => {
            AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/addconsumer`, components, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(folhaCadernetaVenda)
            }).then(response => {
                resolve(response);
            });
        });
    }

    static save(entity, component) {
        const saleUrl = MAP_SALE_URLS.get(entity.type);
        let tipoVenda = { type: entity.type };
        switch (entity.type) {
            case TYPE_SALE.A_VISTA_ANONIMA:

                break;
            case TYPE_SALE.A_VISTA_CONSUMIDOR:

                break;
            case TYPE_SALE.ANOTADA_CONSUMIDOR:
                tipoVenda.folhaCadernetaVenda = {}
                tipoVenda.folhaCadernetaVenda = entity.folhaCadernetaVenda;
                tipoVenda.folhaCadernetaVenda.type = LOCAL_SALE.FOLHA_CADERNETA;
                tipoVenda.folhaCadernetaVenda.venda = entity.venda;
                tipoVenda.folhaCadernetaVenda.venda.produtos = entity.produtosSelecionados;
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
