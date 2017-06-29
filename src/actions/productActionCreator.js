export const CLEAR_FORM_PRODUCT = 'clear_form_product', 
HANDLE_INPUT_CHANGE_PRODUCT = 'handle_input_change_product', 
UPDATE_STATE_PRODUCT = 'update_state_product',
UPDATE_UNIT = 'update_unit',
UPDATE_DAY_OF_WEEK = 'update_day_of_week',
UPDATE_AVAILABLE_DAYS = 'update_available_days',
UPDATE_PRODUCT ='update_product',
NEW_DEFAULT_VALUES = 'new_default_values'



export function clearForm() {
    return { type: CLEAR_FORM_PRODUCT }
}

export function handleInputChange(name, value) {
    return { type: HANDLE_INPUT_CHANGE_PRODUCT, name, value }
}

export function updateState(entity) {
    return { type: UPDATE_STATE_PRODUCT, entity }
}

export function updateUnit(json) {
    return { type: UPDATE_UNIT , json }
}

export function updateDayOfWeek(json) {
    return { type: UPDATE_DAY_OF_WEEK , json }
}

export function updateAvailableDays(chips) {
     return { type: UPDATE_AVAILABLE_DAYS , chips }
}

export function updateProduct(entity) {
     return { type: UPDATE_PRODUCT , entity }
}

export function newDefaultValues(json) {
     return { type: NEW_DEFAULT_VALUES  }
}