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
import { TYPE_SALE, ITEM_MOVIMENTACAO, LOCAL_SALE } from '../../../helpers/constants'



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
        try {
            this.validateSale();
            if (this.props.saleState.type !== TYPE_SALE.ANOTADA_CONSUMIDOR && this.props.saleState.valorPagamento === 0) {
                this.props.showModalToSale();
            }
            SaleService.save(this.props.saleState, this.sendButton).then(response => {
                Toast.show(response.messages);
                this.props.clearForm();
            }).catch(erro => {
                console.log('ERRO [components\\private\\sale\\Sale.js 56]');
            });
        } catch(e) {
            Toast.show(e);
        }
    }

    validateSale() {
        let erros = [];
        if (this.props.saleState.produtosSelecionados.length === 0) {
            erros.push(Toast.build('venda.obrigatorio.venda', Icon.WARNING));
        }
        if (this.props.saleState.type === TYPE_SALE.ANOTADA_CONSUMIDOR && !this.props.saleState.folhaCadernetaVenda.folhaCaderneta.clienteConsumidor.id) {
            erros.push(Toast.build('venda.obrigatorio.consumidor', Icon.WARNING));
        }
        if (this.props.saleState.showModalState === true && this.props.saleState.valorPagamento === 0) {
            erros.push(Toast.build('venda.obrigatorio.valorpagamento', Icon.WARNING));
        }
        if (erros.length > 0) {
            throw erros;
        }
    }

    addItemVenda() {
        if (this.props.saleState.quantidade === '' || this.props.saleState.quantidade === 0) {
            Toast.show('quantidade.required', Icon.WARNING);
            return;
        }
        if (this.props.saleState.produtoSelecionado.id === null) {
            Toast.show('produto.required', Icon.WARNING);
            return;
        }
        const total = this.props.saleState.quantidade * this.props.saleState.produtoSelecionado.precoVenda;
        let itemVenda = {
            type: ITEM_MOVIMENTACAO.ITEM_VENDA,
            venda: this.props.saleState.venda,
            movimentacaoProduto: { 
                produto: { 
                    id: this.props.saleState.produtoSelecionado.id,
                    descricao: this.props.saleState.produtoSelecionado.descricao, 
                    codigo: this.props.saleState.produtoSelecionado.codigo,
                    precoVenda : (this.props.saleState.produtoSelecionado.precoVenda).toFixed(2),
                    precoTotal: (total).toFixed(2),
                    descricaoResumida: this.props.saleState.produtoSelecionado.descricaoResumida
                } , quantidade: this.props.saleState.quantidade
            }
        }
        SaleService.addItemVenda(itemVenda).then(response => {
            if (response.isValid) {
                this.props.addProduct(response.entity);
            } else {
                Toast.show(response.messages);
            }
        });
    }

    addConsumer(clienteConsumidor) {
        let folhaCadernetaVenda = {
            type: LOCAL_SALE.FOLHA_CADERNETA,
            venda: this.props.saleState.venda,
            folhaCaderneta: {
                clienteConsumidor: clienteConsumidor
            }
        };
        SaleService.addConsumer(folhaCadernetaVenda).then(response => {
            this.props.setConsumer(response.entity);
        });
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
                    setConsumer={this.addConsumer.bind(this)}
                    changeRadio={this.props.changeRadio}
                    addProduct={this.addItemVenda.bind(this)}
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
        setConsumer: (folhaCadernetaVenda) => {
            dispatch(updateConsumerAutoComplete(folhaCadernetaVenda));
        },
        changeRadio: (e) => {
            dispatch(changeRadio(e.target.value));
        },
        loadEnum: (name, functionUpdate) => {
            dispatch(EnumService.load(name, functionUpdate));
        },
        addProduct: (itemVenda) => {
            dispatch(addProduct(itemVenda));
        },
        getAppointmentBooks: () => {
            dispatch(AppointmentBookService.getAppointmentBooks(updateAppointmentBooks));
        },
        redirectSaleProduct: (caderneta, e) => {
            dispatch(SaleService.initSale(caderneta, redirectSaleProduct));
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