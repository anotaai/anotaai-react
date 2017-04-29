export function buildPhone(telefoneParameter) {
    let telefoneStr = telefoneParameter.replace('(','').replace(')','').replace('-','');
    let ddi = '';
    let ddd = '';
    let numero = '';
    let telefone = {};
    if (telefoneStr) {
        ddi = 55;
        ddd = telefoneStr.substring(0, 2);
        numero = telefoneStr.substring(2, telefoneStr.length);
    }
    telefone.ddi = ddi;
    telefone.ddd = ddd;
    telefone.numero = numero;

    return telefone;
}

 export function getNumbers(stringParameter) {
    return stringParameter.replace(/[^\d]+/g,'')
}

export function replaceMask(stringParameter) {
     return stringParameter.replace('(', '').replace(')', '').replace('-', '').replace('.', '');
}
