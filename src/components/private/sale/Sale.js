import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInputChange, clearForm, updateProductAutoComplete, updateProductList,
updateConsumerAutoComplete, updateConsumerList, changeRadio, updateTypeSale, 
addProduct, updateAppointmentBooks, redirectSaleProduct, showModalToSale, hideModalToSale } from '../../../actions/saleActionCreator'
import ProductService from '../../../services/product/ProductService'
import ClienteConsumidorService from '../../../services/consumer/ClienteConsumidorService'
import EnumService from '../../../services/util/EnumService'
import AppointmentBookService from '../../../services/appointmentbook/AppointmentBookService'
import { Icon } from '../../../domain/Icon'
import Toast from '../../../helpers/Toast'
import SaleService from '../../../services/sale/SaleService'
import SaleProductContainer from  './SaleProduct'
import AppointmentBook from  './AppointmentBook'
import { TYPE_SALE } from '../../../helpers/constants'


class Sale extends Component {

    constructor() {
        super();
        this.sendButton = null;
    }

    componentWillUnmount() {
        this.props.clearForm();
    }

    componentDidMount() {
        this.props.loadEnum('tipovenda', updateTypeSale);
        this.props.getAppointmentBooks();
    }

    save(e) {
        e.preventDefault();
        let erros = [];
        if (this.props.saleState.produtosSelecionados.length === 0) {
            erros.push(Toast.build('venda.obrigatorio.venda', Icon.WARNING));
        }
        if (this.props.saleState.type === TYPE_SALE.ANOTADA_CONSUMIDOR && !this.props.saleState.folhaCaderneta.clienteConsumidor.id) {
            erros.push(Toast.build('venda.obrigatorio.consumidor', Icon.WARNING));
        }
        if (this.props.saleState.showModalState === true && this.props.saleState.valorPagamento === 0) {
            erros.push(Toast.build('venda.obrigatorio.valorpagamento', Icon.WARNING));
        }
        if (this.props.saleState.type !== TYPE_SALE.ANOTADA_CONSUMIDOR && this.props.saleState.valorPagamento === 0) {
            this.props.showModalToSale();
        }
        if (erros.length > 0) {
            SaleService.save(this.props.saleState, this.sendButton).then(response => {
                Toast.show(response.messages);
                this.props.clearForm();
            }).catch(erro => {
                console.log('ERRO [components\\private\\sale\\Sale.js 56]');
            });
        } else {
            Toast.show(erros);
        }
    }   

    
    render() {
        switch(this.props.saleState.currentPage) {
            case 1: {
                return ( 
                  <AppointmentBook 
                    {... this.props.saleState}
                    cadernetas={this.props.saleState.cadernetas}
                    redirectSaleProduct={this.props.redirectSaleProduct} /> 
                
                )
            }

            case 2: {
                return (
                  <SaleProductContainer
                    {... this.props.saleState} 
                    save={this.save.bind(this)} 
                    handleInputChange={this.props.handleInputChange}
                    handleNumericChange={this.props.handleNumericChange}
                    getProduct={this.props.getProduct}
                    setProduct={this.props.setProduct}
                    getConsumer={this.props.getConsumer}
                    setConsumer={this.props.setConsumer}
                    changeRadio={this.props.changeRadio}
                    addProduct={this.props.addProduct}
                    hideModalToSale={this.props.hideModalToSale}
                    produtosList={this.props.saleState.produtosList}
                    consumidores={this.props.saleState.consumidores}
                    typeSaleList={this.props.saleState.typeSaleList}
                    produtos={this.props.saleState.produtosSelecionados}
                    submitRef={el => this.sendButton = el} />
                )
            }
            default: return null;
        }
    }
}

const mapStateToProps = state => {
    return { saleState: state.sale }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: (e) => {
            dispatch(handleInputChange(e.target.name, e.target.value));
        },
        clearForm: () => {
            dispatch(clearForm());
        },
        getProduct: (name, value) => {
            new Promise((resolve) => {
                resolve(dispatch(handleInputChange(name, value)));
            }).then(() => {
                dispatch(ProductService.getProducts(value, updateProductList, 'S'));
            });
        },
        setProduct: (product) => {
            dispatch(updateProductAutoComplete(product));
        },
        getConsumer: (name, value) => {
            new Promise((resolve) => {
                resolve(dispatch(handleInputChange(name, value)));
            }).then(() => {
                dispatch(ClienteConsumidorService.getConsumers(value, updateConsumerList));
            });
        },
        setConsumer: (clienteConsumidor) => {
            dispatch(updateConsumerAutoComplete(clienteConsumidor));
        },
        changeRadio: (e) => {
            dispatch(changeRadio(e.target.value));
        },
        loadEnum: (name, functionUpdate) => {
            dispatch(EnumService.load(name, functionUpdate));
        },
        addProduct: () => {
            dispatch(addProduct());
        },
        getAppointmentBooks: () => {
            dispatch(AppointmentBookService.getAppointmentBooks(updateAppointmentBooks));
        },
        redirectSaleProduct: (id, e) => {
            dispatch(SaleService.initSale(id, redirectSaleProduct));
        },
        hideModalToSale: () => {
            dispatch(hideModalToSale());
        },
        showModalToSale: () => {
            dispatch(showModalToSale());
        },
        handleNumericChange: (name, value) => {
            if (value !== 0) {
                dispatch(handleInputChange(name, value));
            }
        }
    }
}

const SaleContainer = connect(mapStateToProps, mapDispatchToProps)(Sale);
export default SaleContainer;