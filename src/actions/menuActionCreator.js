export const UPDATE_MENU = 'update_menu', TOGGLE_MENU = 'toggle_menu';

export function updateMenu(itens) {
    return {type: UPDATE_MENU, itens}
}

export function toggleMenu() {
    return {type: TOGGLE_MENU}
}