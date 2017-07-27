import Toast from '../../helpers/Toast'

export default class EnumService {

  static getEndpoint() {
     return '/enums'
  }

  static load(enumName, updateEnum) {

    return dispatch => {

      return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/${enumName}`)
        .then(response => {
          return response.json();
        }).then((json) => {
          dispatch(updateEnum(json))
        }).catch(error => {
           Toast.defaultError();
        });
    }
  }
}