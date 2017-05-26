import { PAGE_SIZE} from  '../../helpers/constants'

export default class Sector {


    static listAll(offset,nomeSetor) {
       
        return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/setor?start=${offset}&max=${PAGE_SIZE}&nomeSetor=${nomeSetor}`
        ).then(response => {
            return response.json();
        }).catch(error => {
           throw Error(error);
        });
            
    }

    static remove(id) {
           
        return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/setor/${id}`,{
            method: 'DELETE'
        }).then(response => {
           return response.json();
        }).catch(error => {
            throw Error(error);
        });
    }

    static save(setor) {
        return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/setor`,{
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(setor)
        }).then(response => {
            return response.json();
        }).catch(error => {
            throw Error(error);
        });
    }

}