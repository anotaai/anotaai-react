import Toast from '../../helpers/Toast'

export default class EnumService {

  static load(enumName, updateEnum) {

    return dispatch => {

      return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/enums/${enumName}`)
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