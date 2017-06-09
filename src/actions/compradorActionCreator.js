export const HANDLE_INPUT_CHANGE_COMPRADOR = 'handle_input_change_comprador',
    CLEAR_FORM_COMPRADOR = 'clear_form_comprador',
    HANDLE_PHONE_CHANGE_COMPRADOR = 'handle_phone_change_comprador',
    CLEAR_PASSWORD_COMPRADOR = 'clear_password_comprador';


export function handleInputChange(name, value) {
    return { type: HANDLE_INPUT_CHANGE_COMPRADOR, name, value }
}

export function handlePhoneChange(entity) {
    return { type: HANDLE_PHONE_CHANGE_COMPRADOR, entity }
}

export function clearForm() {
    return { type: CLEAR_FORM_COMPRADOR }
}

export function clearPassword() {
    return { type: CLEAR_PASSWORD_COMPRADOR }
}