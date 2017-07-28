export const UPDATE_MENU = 'update_menu', TOGGLE_MENU = 'toggle_menu', TOGGLE_RESPONSIVE_MENU = 'toggle_responsive_menu';

export function updateMenu(itens) {
    return {type: UPDATE_MENU, itens}
}

export function toggleMenu() {
    return {type: TOGGLE_MENU}
}

export function toggleResponsiveMenu() {
    return {type: TOGGLE_RESPONSIVE_MENU}
}