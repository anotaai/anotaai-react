export const HANDLE_INPUT_CHANGE_COMMODITY = 'handle_input_change_commodity', 
UPDATE_PRODUCT_LIST_COMMODITY = 'update_product_list_commodidty',
UPDATE_PRODUCT_AUTO_COMPLETE_COMMODITY = 'update_product_auto_complete_commodity',
UPDATE_TABLE_ITENS_COMMODITY = 'update_table_itens_commodity',
CLEAR_FORM_COMMODITY = 'clear_form_commodity',
UPDATE_COMMODITY = 'update_commodity',
SHOW_MODAL_COMMODITY = 'show_modal_commodity',
HIDE_MODAL_COMMODITY = 'hide_modal_commodity',
REJECT_COMMODITY = 'reject_commodity',
REMOVE_PRODUCT_COMMODITY = 'remove_product_commodity',
UPDATE_REJECT_COMMODITY = 'update_reject_commodity',
UPDATE_COMMODITY_BY_PRODUCT = 'update_commodity_by_product';


export function handleInputChange(name, value,index) {
    return { type: HANDLE_INPUT_CHANGE_COMMODITY, name, value, index }
}

export function updateProductList(list) {
    return { type: UPDATE_PRODUCT_LIST_COMMODITY, list }
}

export function updateProductAutoComplete(product) {
    return { type: UPDATE_PRODUCT_AUTO_COMPLETE_COMMODITY, product }
}

export function updateTableItens(json) {
    return { type: UPDATE_TABLE_ITENS_COMMODITY }
}

export function removeProduct(id) {
    return { type: REMOVE_PRODUCT_COMMODITY, id }
}

export function clearForm() {
     return { type: CLEAR_FORM_COMMODITY }
}
export function updateState(entity) {
    return { type: UPDATE_COMMODITY, entity }
}

export function showModal() {
    return { type: SHOW_MODAL_COMMODITY  }
}

export function hideModal() {
    return { type: HIDE_MODAL_COMMODITY  }
}

export function rejectCommodity(id) {
    return  { type: REJECT_COMMODITY , id }
}

export function updateRejectCommodity() {
     return  { type: UPDATE_REJECT_COMMODITY  }
}

export function updateCommodityByProduct(id,descricao,quantidade,precoCusto) {
    return  { type: UPDATE_COMMODITY_BY_PRODUCT, id, descricao, quantidade, precoCusto }
}
