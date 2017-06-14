export const CLEAR_FORM_GROUP_PRODUCT = 'clear_form_group_product', 
HANDLE_INPUT_CHANGE_GROUP_PRODUCT = 'handle_input_change_group_product',
UPDATE_STATE_GROUP_PRODUCT = 'update_state_group_product',
UPDATE_SECTOR_LIST = 'update_sector_list',
UPDATE_SECTOR = 'update_sector'



export function clearForm() {
    return { type: CLEAR_FORM_GROUP_PRODUCT }
}

export function handleInputChange(name, value) {
    return { type: HANDLE_INPUT_CHANGE_GROUP_PRODUCT, name, value }
}

export function updateState(entity) {
    return { type: UPDATE_STATE_GROUP_PRODUCT, entity }
}

export function updateSectorList(list) {
      return { type: UPDATE_SECTOR_LIST, list }
}

export function updateSector(sector) {
    return {type: UPDATE_SECTOR , sector}
}