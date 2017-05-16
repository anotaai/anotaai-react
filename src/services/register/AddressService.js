
export default class AddressService  {
        
        static findCep(cep) {
            return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/enderecos/findcep/${cep}`)
                  .then(response => {
                        return response.json();
                    })
                  .catch(error => {
                   throw Error(error);
                  }); 
        }
         
}