export function handleInputChange(action, name, value) {
    return { type: `HANDLE_INPUT_CHANGE_${action}`, name, value };
}

export function clearForm(action) {
    return { type: `CLEAR_FORM_${action}` }
}

export function clearPassword(action) {
    return { type: `CLEAR_PASSWORD_${action}` }
}

export function showModal(action) {
    return { type: `SHOW_MODAL_${action}` }
}

export function hideModal(action) {
    return { type: `HIDE_MODAL_${action}` }
}

export function updateUser(action, entity, activationCode) {
    return { type: `UPDATE_USER_${action}`, entity, activationCode }
}

export function changeRadio(action, value) {
    return { type: `CHANGE_RADIO_${action}`, value }
}