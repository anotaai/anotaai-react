export function list(action,filteredResults) {
    return { type: `LIST_${action}` , filteredResults };
}

export function remove(action,id) {
    return { type: `REMOVE_${action}`, id }
}

export function clearForm(action) {
    return { type: `CLEAR_FORM_${action}` }
}