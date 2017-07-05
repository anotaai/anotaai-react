export const CLEAR_FORM_SECTOR = 'clear_form_sector', HANDLE_INPUT_CHANGE_SECTOR = 'handle_input_change_sector', UPDATE_STATE_SECTOR = 'update_state_sector', SHOW_MODAL_SECTOR = 'show_modal_sector', HIDE_MODAL_SECTOR = 'hide_modal_sector'

export function clearForm() {
    return { type: CLEAR_FORM_SECTOR }
}

export function handleInputChange(name, value) {
    return { type: HANDLE_INPUT_CHANGE_SECTOR, name, value }
}

export function updateState(entity) {
    return { type: UPDATE_STATE_SECTOR, entity }
}

export function showModal() {
    return { type: SHOW_MODAL_SECTOR }
}

export function hideModal() {
    return { type: HIDE_MODAL_SECTOR }
}