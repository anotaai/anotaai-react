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
  DASHBOARD: '/dashboard',
  CONSUMER: '/consumidor',
  NEW_CONSUMER: '/new/consumidor',
  EDIT_CONSUMER: '/consumidor(/:id)',
  PRODUCT: '/produto',
  NEW_PRODUCT: '/new/produto',
  EDIT_PRODUCT: '/produto(/:id)'
}

export const USE_CASE = {
  SEARCH_SECTOR: 'SEARCH_SECTOR',
  SEARCH_GROUP_PRODUCT: 'SEARCH_GROUP_PRODUCT',
  SEARCH_CONSUMER: 'SEARCH_CONSUMER',
  SEARCH_PRODUCT: 'SEARCH_PRODUCT',
  LOGIN: 'LOGIN',
  MODAL_RENEW: 'MODAL_RENEW',
  RENEW: 'RENEW',
  CONSUMER: 'CONSUMER'
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
  [{ id: 'nome', label: 'Nome' }]
)


export const AUTO_COMPLETE_MENU_STYLE = {
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 0',
  fontSize: '90%',
  position: 'fixed',
  overflow: 'auto',
  maxHeight: '50%',
  zIndex: '999'
}

export const AUTO_COMPLETE_WRAPPER_STYLE = { display: 'inline' }