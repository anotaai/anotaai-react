import {urlBackend,toastError,toastDefaultTime} from '../../helpers/constants'
import ShowMessage from '../../helpers/ShowMessage' 

export default class EnumService  {
    
     static load(enumName) {
       return fetch(`${urlBackend}/rest/enums/${enumName}`)
        .then(response => response.json())
        .catch(error => {
          console.log(error);
          ShowMessage.show(`Ocorreu um erro ao recuperar o serviço de ${enumName}`,toastError)
      }); 
      
     }
}