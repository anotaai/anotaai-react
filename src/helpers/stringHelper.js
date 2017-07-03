export function buildPhone(telefoneParameter) {

    let telefone = {};


    let telefoneStr = replaceMask(telefoneParameter);
    let ddi = '';
    let ddd = '';
    let numero = '';

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
    return stringParameter.replace(/[^\d]+/g, '')
}

export function getPhoneMask(telefoneParameter) {
     const telefoneStr = telefoneParameter.replace(/^(\d{2})(\d)/g, "($1) $2");
     return telefoneStr.replace(/(\d)(\d{4})$/, "$1-$2");
}

export function replaceMask(stringParameter) {
    return stringParameter.replace('(', '').replace(')', '').replace('-', '').replace('.', '');
}

export function getDayForEnum(day) {
    return day.toUpperCase().replace(' ','_').replace('Ç','C').replace('Á','A');
}

