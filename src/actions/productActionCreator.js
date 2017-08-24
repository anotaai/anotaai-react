export const CLEAR_FORM_PRODUCT = 'clear_form_product',
    HANDLE_INPUT_CHANGE_PRODUCT = 'handle_input_change_product',
    UPDATE_UNIT = 'update_unit',
    UPDATE_DAY_OF_WEEK = 'update_day_of_week',
    UPDATE_AVAILABLE_DAYS = 'update_available_days',
    UPDATE_PRODUCT = 'update_product',
    UPDATE_PRODUCT_LIST = 'update_product_list',
    UPDATE_GROUP_PRODUCT_LIST = 'update_group_product_list',
    UPDATE_PRODUCT_AUTO_COMPLETE = 'update_product_auto_complete',
    UPDATE_TABLE_ITENS = 'update_table_itens',
    UPDATE_GROUP_PRODUCT_TABLE_ITENS = 'update_group_product_table_itens',
    NEW_DEFAULT_VALUES = 'new_default_values',
    REMOVE_PRODUCT = 'remove_product',
    REMOVE_GROUP_PRODUCT = 'remove_group_product',
    SHOW_MODAL_PRODUCT = 'show_modal_product',
    HIDE_MODAL_PRODUCT = 'hide_modal_product',
    TOGGLE_GROUP_PRODUCT_ACCORDION = 'toggle_group_product_accordion',
    TOGGLE_COMMODITY_ACCORDION = 'toggle_commodity_accordion',
    UPDATE_GROUP_PRODUCT_AUTO_COMPLETE = 'update_group_product_auto_complete',
    UPDATE_STORAGE_PRODUCT = 'update_storage_product',
    CHANGE_GROUP_PRODUCT_RADIO = 'change_group_product_radio',
    SHOW_MODAL_TO_COMMODITY = 'show_modal_to_commodity',
    HIDE_MODAL_TO_COMMODITY = 'hide_modal_to_commodity',
    UPDATE_PRODUCT_BY_GROUP = 'update_product_by_group'


export function clearForm() {
    return { type: CLEAR_FORM_PRODUCT }
}

export function handleInputChange(name, value) {
    return { type: HANDLE_INPUT_CHANGE_PRODUCT, name, value }
}

export function updateUnit(json) {
    return { type: UPDATE_UNIT, json }
}

export function updateDayOfWeek(json) {
    return { type: UPDATE_DAY_OF_WEEK, json }
}

export function updateAvailableDays(chips) {
    return { type: UPDATE_AVAILABLE_DAYS, chips }
}

export function updateProduct(entity) {
    return { type: UPDATE_PRODUCT, entity }
}

export function updateProductList(list) {
    return { type: UPDATE_PRODUCT_LIST, list }
}

export function updateGroupProductList(list) {
    return { type: UPDATE_GROUP_PRODUCT_LIST, list }
}

export function updateProductAutoComplete(product) {
    return { type: UPDATE_PRODUCT_AUTO_COMPLETE, product }
}

export function updateGroupProductAutoComplete(groupProduct) {
    return { type: UPDATE_GROUP_PRODUCT_AUTO_COMPLETE, groupProduct }
}

export function newDefaultValues() {
    return { type: NEW_DEFAULT_VALUES }
}

export function updateTableItens() {
    return { type: UPDATE_TABLE_ITENS }
}

export function updateGroupProductTableItens() {
    return { type: UPDATE_GROUP_PRODUCT_TABLE_ITENS }
}

export function removeProduct(id) {
    return { type: REMOVE_PRODUCT, id }
}

export function removeGroupProduct(id) {
    return { type: REMOVE_GROUP_PRODUCT, id }
}

export function showModal(id) {
    return { type: SHOW_MODAL_PRODUCT }
}

export function hideModal(id) {
    return { type: HIDE_MODAL_PRODUCT }
}

export function toggleGroupProductAccordion() {
    return { type: TOGGLE_GROUP_PRODUCT_ACCORDION }
}

export function toggleCommodityAccordion() {
    return { type: TOGGLE_COMMODITY_ACCORDION }
}

export function changeGroupProductRadio(id) {
    return { type: CHANGE_GROUP_PRODUCT_RADIO, id }
}

export function updateStorageProduct(json) {
   return { type: UPDATE_STORAGE_PRODUCT, json}
}

export function showModalCommodity(json) {
    return { type: SHOW_MODAL_TO_COMMODITY }
 }

 export function hideModalCommodity(json) {
    return { type: HIDE_MODAL_TO_COMMODITY }
 }

 export function updateProductByGroup(id,nome) {
     return { type: UPDATE_PRODUCT_BY_GROUP, id, nome }
 }





