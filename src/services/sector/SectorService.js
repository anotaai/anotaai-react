import { PAGE_SIZE} from  '../../helpers/constants'

export default class Sector {


    static listAll(offset) {
       
        return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/setor?start=${offset}&max=${PAGE_SIZE}`
        ).then(response => {
            return response.json();
        }).catch(error => {
           throw Error(error);
        });
            
    }

}