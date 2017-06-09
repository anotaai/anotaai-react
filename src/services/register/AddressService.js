import { updateAddress } from '../../actions/vendedorActionCreator'
import { Icon } from '../../domain/Icon';
import Toast from '../..//helpers/Toast';

export default class AddressService {

    static findCep(cep) {

        return dispatch => {
            fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/enderecos/findcep/${cep}`)
                .then(response => {
                    return response.json();
                }).then(address => {
                    if (address.logradouro == null) {
                        Toast.show('cep.nao.localizado', Icon.WARNING);
                    } else {
                        dispatch(updateAddress(address));
                    }
                }).catch(error => {
                    Toast.defaultError();
                });
        }


    }

}