import CrudService from '../CrudService'
import { MAP_SALE_URLS, TYPE_SALE } from '../../helpers/constants'
import AsyncService from '../AsyncService'

export default class SaleService extends CrudService {

    static getEndpoint() {
        return '/venda'
    }

    static initSale(caderneta, ...components) {
        return AsyncService.post(`${this.getEndpoint()}/initsale`, caderneta, components); 
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

    static removeConsumer(folhaCadernetaVenda, components) {
        return AsyncService.post(`${this.getEndpoint()}/removeconsumer`, folhaCadernetaVenda);
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
                tipoVenda.cadernetaVenda = entity.cadernetaVenda;
                tipoVenda.cadernetaVenda.venda = entity.venda;
                break;
            case TYPE_SALE.A_VISTA_CONSUMIDOR:
            case TYPE_SALE.ANOTADA_CONSUMIDOR:
                tipoVenda.folhaCadernetaVenda = entity.folhaCadernetaVenda;
                tipoVenda.folhaCadernetaVenda.venda = entity.venda;
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
