export const HANDLE_INPUT_CHANGE_APPOINTMENT = 'HANDLE_INPUT_CHANGE_APPOINTMENT';

export function handleInputChange(name,value) {
    return { type: HANDLE_INPUT_CHANGE_APPOINTMENT, name, value }
}