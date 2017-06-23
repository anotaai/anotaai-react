export const CLEAR_FORM_PRODUCT = 'clear_form_product', HANDLE_INPUT_CHANGE_PRODUCT = 'handle_input_change_product', UPDATE_STATE_PRODUCT = 'update_state_product'

export function clearForm() {
    return { type: CLEAR_FORM_PRODUCT }
}

export function handleInputChange(name, value) {
    return { type: HANDLE_INPUT_CHANGE_PRODUCT, name, value }
}

export function updateState(entity) {
    return { type: UPDATE_STATE_PRODUCT, entity }
}