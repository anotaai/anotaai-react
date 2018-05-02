import { updateAddress } from '../../actions/vendedorActionCreator'
import { Icon } from '../../domain/Icon';
import Toast from '../..//helpers/Toast';

export default class AddressService {

    static getEndpoint() {
        return '/enderecos';
    }

    static findCep(cep) {

        return dispatch => {
            fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/findcep/${cep}`).then(address => {
                    if (address.logradouro == null) {
                        Toast.show('cep.nao.localizado', Icon.WARNING);
                    } else {
                        dispatch(updateAddress(address));
                    }
                }).catch(error => {
                    console.log('ERRO [services\\register\\AddressService.js 21]');
                });
        }


    }

}