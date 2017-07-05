export const CLEAR_FORM_CONSUMER = 'clear_form_consumer', HANDLE_INPUT_CHANGE_CONSUMER = 'handle_input_change_consumer', UPDATE_STATE_CONSUMER = 'update_state_consumer', 
RECOMMEND_EDITION = 'recommend_edition', SHOW_MODAL_CONSUMER = 'show_modal_consumer' , HIDE_MODAL_CONSUMER = 'hide_modal_consumer'

export function clearForm() {
    return { type: CLEAR_FORM_CONSUMER }
}

export function handleInputChange(name, value) {
    return { type: HANDLE_INPUT_CHANGE_CONSUMER, name, value }
}

export function updateState(entity) {
    return { type: UPDATE_STATE_CONSUMER, entity }
}

export function activateRecommendEdition(entity) {
    return { type: RECOMMEND_EDITION, entity }
}

export function showModal() {
    return { type: SHOW_MODAL_CONSUMER }
}
export function hideModal() {
    return { type: HIDE_MODAL_CONSUMER }
}