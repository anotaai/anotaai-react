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
    return day.toUpperCase().replace(' ', '_').replace('Ç', 'C').replace('Á', 'A');
}

export function concatZeros(number) {

    let splitNumber = number.toString().split('.');
    let finalValue = splitNumber[0];

    //com decimais
    if (splitNumber.length === 2) {
        finalValue += splitNumber[1];

        if (splitNumber[1].length === 1) {
            finalValue += '0';
        }

        //sem decimais
    } else {
        finalValue += '00';
    }

    return Number(finalValue);
}

export function concatDot(number) {
    let str = number.toString();
    var output = str.substr(0, str.length - 2) + '.' + str.substr(str.length - 2);
    return Number(output);
}

export function dateToHtmlString(date) {
    return date.toISOString().substr(0,10);
}
