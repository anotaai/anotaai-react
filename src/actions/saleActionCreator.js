export const HANDLE_INPUT_CHANGE_SALE = 'handle_input_change_sale', 
CLEAR_FORM_SALE = 'clear_form_sale',
UPDATE_PRODUCT_LIST_SALE = 'update_product_list_sale',
UPDATE_PRODUCT_AUTO_COMPLETE_SALE = 'update_product_auto_complete_sale',
UPDATE_CONSUMER_AUTO_COMPLETE_SALE = 'update_consumer_auto_complete_sale',
UPDATE_CONSUMER_LIST_SALE = 'update_consumer_list_sale',
ADD_PRODUCT = 'add_product',
UPDATE_TYPE_SALE = 'update_type_sale',
CHANGE_RADIO_SALE = 'change_radio_sale',
UPDATE_APPOINTMENT_BOOKS = 'update_appointment_books',
REDIRECT_SALE_PRODUCT = 'redirect_sale_product',
SHOW_MODAL_TO_SALE = 'show_modal_to_sale',
HIDE_MODAL_TO_SALE = 'hide_modal_to_sale'

export function handleInputChange(name,value) {
    return { type: HANDLE_INPUT_CHANGE_SALE , name , value }
}

export function clearForm() {
    return { type: CLEAR_FORM_SALE }
}

export function updateProductList(list) {
    return { type: UPDATE_PRODUCT_LIST_SALE, list }
}

export function updateProductAutoComplete(product) {
    return { type: UPDATE_PRODUCT_AUTO_COMPLETE_SALE, product }
}

export function updateConsumerList(list) {
    return { type: UPDATE_CONSUMER_LIST_SALE, list }
}

export function updateConsumerAutoComplete(consumer) {
    return { type: UPDATE_CONSUMER_AUTO_COMPLETE_SALE, consumer }
} 

export function changeRadio(value) {
    return { type: CHANGE_RADIO_SALE , value}
}

export function addProduct() {
    return { type: ADD_PRODUCT }
}

export function updateTypeSale(list) {
    return { type: UPDATE_TYPE_SALE , list }
} 

export function updateAppointmentBooks(list) {
    return { type: UPDATE_APPOINTMENT_BOOKS, list }
}

export function redirectSaleProduct(id) {
    return { type: REDIRECT_SALE_PRODUCT, id }
}

export function showModalToSale() {
    return { type: SHOW_MODAL_TO_SALE  }
}

export function hideModalToSale() {
    return { type: HIDE_MODAL_TO_SALE  }
}