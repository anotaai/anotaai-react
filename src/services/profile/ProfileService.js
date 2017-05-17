
export default class ProfileService {

  static upload(file) {

    /*  
      const sendFile = { 
        file : file,
  size : file.size,
  name : file.name,
  tipoArquivo : file.type
      };
           */
    var formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    // formData.append('size',  file.size);
    // formData.append('type',  file.type);

    fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/fileUpload/upload`,
      {
        method: 'POST',
        body: formData
      })
      .then(response => {
        return response;
      }).catch(error => {
        throw Error(error);
      });

  }

}