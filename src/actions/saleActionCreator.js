export const HANDLE_INPUT_CHANGE_SALE = 'handle_input_change_sale';

export function handleInputChange(name,value) {
    return { type: HANDLE_INPUT_CHANGE_SALE , name , value }
}