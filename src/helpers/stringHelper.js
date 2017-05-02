export function buildPhone(telefoneParameter) {

    let telefone = {};

    if (telefoneParameter !== '') {

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

    }

    return telefone;

}

export function getNumbers(stringParameter) {
    return stringParameter.replace(/[^\d]+/g, '')
}

export function replaceMask(stringParameter) {
    return stringParameter.replace('(', '').replace(')', '').replace('-', '').replace('.', '');
}

