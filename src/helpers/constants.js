export const NEW_USE_CASE_PATH = '/new';
export const TABLE_DEFAULT_CSS = "striped bordered";
export const DEFAULT_TIME = 3000;
export const COOKIE_USER = 'globals';
export const PAGE_SIZE = 5;

export const URL = {
  ACTIVATE: '/activate(/:key)',
  LOGIN: '/login',
  REGISTER: '/register',
  COMPRADOR: '/comprador',
  COMPRADOR_ACTIVATE: '/comprador(/:key)',
  VENDEDOR: '/vendedor',
  GROUP_PRODUCT: '/grupoproduto',
  NEW_GROUP_PRODUCT: `${NEW_USE_CASE_PATH}/grupoproduto`,
  EDIT_GROUP_PRODUCT: '/grupoproduto(/:id)',
  SECTOR: '/setor',
  NEW_SECTOR: `${NEW_USE_CASE_PATH}/setor`,
  EDIT_SECTOR: '/setor(/:id)',
  RENEW_PASSWORD: '/renew(/:activation)',
  SETTINGS: '/settings',
  DASHBOARD: '/dashboard',
  CONSUMER: '/consumidor',
  NEW_CONSUMER: `${NEW_USE_CASE_PATH}/consumidor`,
  EDIT_CONSUMER: '/consumidor(/:id)',
  PRODUCT: '/produto',
  NEW_PRODUCT: `${NEW_USE_CASE_PATH}/produto`,
  EDIT_PRODUCT: '/produto(/:id)',
  COMMODITY: '/entradamercadoria' ,
  NEW_COMMODITY: `${NEW_USE_CASE_PATH}/entradamercadoria` ,
  EDIT_COMODDITY: '/entradamercadoria(/:id)',
  DELETE_COMMODITY: '/estornarmercadoria(/:id)'

}

export const USE_CASE = {
  SEARCH_SECTOR: 'SEARCH_SECTOR',
  SEARCH_GROUP_PRODUCT: 'SEARCH_GROUP_PRODUCT',
  SEARCH_CONSUMER: 'SEARCH_CONSUMER',
  SEARCH_PRODUCT: 'SEARCH_PRODUCT',
  SEARCH_COMMODITY: 'SEARCH_COMMODITY',
  LOGIN: 'LOGIN',
  MODAL_RENEW: 'MODAL_RENEW',
  RENEW: 'RENEW'
}


export const customModalStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '30px',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
      zIndex: 99999
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
  position: 'absolute',
  overflow: 'auto',
  maxHeight: '50%',
  zIndex: 999,
  cursor: 'pointer'
}

export const AUTO_COMPLETE_WRAPPER_STYLE = { display: 'inline' }


export const CHIPS_THEME = {
  
  chipsContainer: {
    display: "flex",
    position: "relative",
    border: "1px solid #ccc",
    backgroundColor: '#f5f5f5',
    font: "13.33333px Arial",
    minHeight: 24,
    alignItems: "center",
    flexWrap: "wrap",
    padding: "2.5px",
    borderRadius: 5,
    ':focus': {
      border: "1px solid #aaa",
    }
  },
  container: {
    flex: 1,
  },
  containerOpen: {

  },
  input: {
    border: 'none',
    outline: 'none',
    boxSizing: 'border-box',
    width: '100%',
    padding: 5,
    margin: 2.5
  },
  suggestionsContainer: {

  },
  suggestionsList: {
    position: 'absolute',
    border: '1px solid #ccc',
    zIndex: 10,
    left: 0,
    top: '100%',
    width: '100%',
    backgroundColor: '#fff',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    cursor: 'pointer'
  },
  suggestion: {
    padding: '5px 15px'
  },
  suggestionHighlighted: {
    background: '#ddd'
  },
  sectionContainer: {

  },
  sectionTitle: {

  },
}
