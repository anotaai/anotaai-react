export default class EnumService  {
    
     static load(enumName) {
       return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/enums/${enumName}`)
        .then(response => {
           return response.json();
        }).catch(error => {
          throw Error(error);
        }); 
      
     }
}