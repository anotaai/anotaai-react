export const CLEAR_FORM_CONSUMER = 'clear_form_consumer', HANDLE_INPUT_CHANGE_CONSUMER = 'handle_input_change_consumer', UPDATE_STATE_CONSUMER = 'update_state_consumer', RECOMMEND_EDITION = 'recommend_edition'

export function clearForm() {
    return { type: CLEAR_FORM_CONSUMER }
}

export function handleInputChange(name, value) {
    return { type: HANDLE_INPUT_CHANGE_CONSUMER, name, value }
}

export function updateState(entity) {
    return { type: UPDATE_STATE_CONSUMER, entity }
}

export function recommendEdition(entity) {
    return { type: RECOMMEND_EDITION, entity }
}