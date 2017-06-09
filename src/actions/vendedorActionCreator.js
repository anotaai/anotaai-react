export const HANDLE_INPUT_CHANGE_VENDEDOR = 'handle_input_change_vendedor',
    CLEAR_FORM_VENDEDOR = 'clear_form_vendedor',
    UPDATE_ENUM = 'update_enum',
    UPDATE_ADDRESS = 'update_cep',
    HANDLE_PHONE_CHANGE_VENDEDOR = 'handle_phone_change_vendedor',
    CLEAR_ADDRESS = 'clear_address',
    CLEAR_PASSWORD_VENDEDOR = 'clear_password_vendedor';


export function handleInputChange(name, value) {
    return { type: HANDLE_INPUT_CHANGE_VENDEDOR, name, value }
}

export function handlePhoneChange(entity) {
    return { type: HANDLE_PHONE_CHANGE_VENDEDOR, entity }
}

export function clearForm() {
    return { type: CLEAR_FORM_VENDEDOR }
}

export function clearAddress() {
    return { type: CLEAR_ADDRESS }
}

export function clearPassword() {
    return { type: CLEAR_PASSWORD_VENDEDOR }
}

export function updateEnum(json) {
    return { type: UPDATE_ENUM, json }
}

export function updateAddress(endereco) {
    return { type: UPDATE_ADDRESS, endereco }
}