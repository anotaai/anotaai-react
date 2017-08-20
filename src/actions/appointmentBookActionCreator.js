export const HANDLE_INPUT_CHANGE_APPOINTMENT_BOOK = 'handle_input_change_appointent_book', 
ADD_BOOK = 'add_book', 
CLEAR_FORM_APPOINTMENT_BOOK = 'clear_form_appointment_book',
REMOVE_BOOK = 'remove_book',
SHOW_MODAL_APPOINTMENT_BOOK = 'show_modal_appointment_book',
UPDATE_APPOINTMENT_BOOK = 'update_appointment_book',
HIDE_MODAL_APPOINTMENT_BOOK = 'hide_modal_commodity';

export function handleInputChange(name,value) {
    return { type: HANDLE_INPUT_CHANGE_APPOINTMENT_BOOK, name, value }
}

export function addBook() {
    return { type: ADD_BOOK  }
}

export function clearForm() {
    return { type: CLEAR_FORM_APPOINTMENT_BOOK  }
}

export function removeBook(position) {
   return { type: REMOVE_BOOK ,position}
}

export function showModal() {
    return { type: SHOW_MODAL_APPOINTMENT_BOOK }
}

export function hideModal() {
    return { type: HIDE_MODAL_APPOINTMENT_BOOK }
}

export function updateState(entity) {
    return { type: UPDATE_APPOINTMENT_BOOK, entity }
}