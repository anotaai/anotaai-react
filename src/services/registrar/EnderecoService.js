import {urlBackend,toastError,toastDefaultTime} from '../../helpers/constants'
import ShowMessage from '../../helpers/ShowMessage' 

export default class EnderecoService  {
        
        static findCep(cep) {
            return fetch(`${urlBackend}rest/enderecos/findcep/${cep}`)
                     .then(response => response.json)
                     .catch(error => ShowMessage.show(`Ocorreu um erro ao recuperar o serviço de ${enumName}: ${error}`,toastDefaultTime,toastError)); 
        }
         
}