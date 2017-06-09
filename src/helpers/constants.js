export const URL = {
    ACTIVATE: '/activate(/:key)',
    LOGIN: '/login',
    REGISTER: '/register',
    COMPRADOR: '/comprador',
    VENDEDOR: '/vendedor',
    GROUP_PRODUCT: '/grupoproduto',
    NEW_GROUP_PRODUCT: '/new/grupoproduto',
    EDIT_GROUP_PRODUCT: '/grupoproduto(/:id)',
    SECTOR: '/setor',
    NEW_SECTOR: '/new/setor',
    EDIT_SECTOR: '/setor(/:id)',
    RENEW_PASSWORD: '/renew(/:activation)',
    SETTINGS: '/settings',
    DASHBOARD: '/dashboard'
}

export const USE_CASE = {
    SEARCH_SECTOR: 'SEARCH_SECTOR',
    SEARCH_GROUP_PRODUCT: 'SEARCH_GROUP_PRODUCT',
    LOGIN: 'LOGIN',
    MODAL_RENEW: 'MODAL_RENEW',
    RENEW: 'RENEW'
}


export const DEFAULT_TIME = 3000;
export const COOKIE_USER = 'globals';
export const PAGE_SIZE = 5;


export const customModalStyles = {
      content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: '30px',
        transform: 'translate(-50%, -50%)'
      }
}


export const defaultFilters = (
  [{id: 'nome', label: 'Nome'}]
)
 