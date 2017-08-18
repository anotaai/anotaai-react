export const HANDLE_INPUT_CHANGE_APPOINTMENT = 'HANDLE_INPUT_CHANGE_APPOINTMENT', ADD_BOOK = 'ADD_BOOK', CLEAR_FORM_APPOINTMENT_BOOK = 'CLEAR_FORM_APPOINTMENT_BOOK';

export function handleInputChange(name,value) {
    return { type: HANDLE_INPUT_CHANGE_APPOINTMENT, name, value }
}

export function addBook() {
    return { type: ADD_BOOK  }
}

export function clearForm() {
    return { type: CLEAR_FORM_APPOINTMENT_BOOK  }
}