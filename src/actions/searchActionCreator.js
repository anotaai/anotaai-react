export function list(action,filteredResults) {
    return { type: `LIST_${action}` , filteredResults };
}

export function remove(action,id) {
    return { type: `REMOVE_${action}`, id }
}

export function clearForm(action) {
    return { type: `CLEAR_FORM_${action}` }
}

export function handlePageClick(action,offset) {
    return { type: `HANDLE_PAGE_CLICK_${action}` , offset }
}


export function showModal(action,idRemove) {
    return { type: `SHOW_MODAL_${action}` , idRemove }
}

export function hideModal(action) {
    return { type: `HIDE_MODAL_${action}`}
}

