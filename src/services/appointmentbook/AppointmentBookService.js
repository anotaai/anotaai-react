import CrudService from '../CrudService';

export default class AppointmentBookService extends CrudService {

    static getEndpoint() {
        return '/caderneta';
    }

    static checkSameConfiguration(diaBase, qtdDiasDuracaoFolha, id) {
        let entity = { id: id, diaBase: diaBase, qtdDiasDuracaoFolha: qtdDiasDuracaoFolha };
        return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/checkSameConfiguration`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(entity)
        }).catch(error => {
            throw Error(error);
        });
    }

    static removeByBookId(id) {
        return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/removeByBookId/${id}`, {
            method: 'DELETE'
        }).catch(error => {
            throw Error(error);
        });
    }

    static getAppointmentBooks(updateAppointmentBooks) {
        return dispatch => {
            fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/getappointmentbooks`
            ).then(json => {
                dispatch(updateAppointmentBooks(json));
            }).catch(error => {
                console.log('ERRO [services\\appointmentbook\\AppointmentBookService.js 36]');
            });
        }
    }

}