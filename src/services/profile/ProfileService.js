
export default class ProfileService {

  static getEndpoint() {
    return '/fileUpload';
  }

  static upload(file) {
   
    var formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);

    return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/upload`,
      {
        method: 'POST',
        body: formData
      })
      .then(response => {
        return response.json();
      }).catch(error => {
        throw Error(error);
      });

  }

}