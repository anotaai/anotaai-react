export default class EnumService {

  static getEndpoint() {
     return '/enums'
  }

  static load(enumName, updateEnum) {

    return dispatch => {

      return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/${enumName}`).then((json) => {
          dispatch(updateEnum(json))
        }).catch(error => {
          console.log('ERRO [services\\util\\EnumService.js 16]');
        });
    }
  }
}