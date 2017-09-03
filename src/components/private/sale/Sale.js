import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInputChange, clearForm, updateProductAutoComplete, updateProductList,
    updateConsumerAutoComplete, updateConsumerList, changeRadio, updateTypeSale,  addProduct } from '../../../actions/saleActionCreator'
import { PanelHeader, PanelSale } from '../../panels'
import { TABLE_DEFAULT_CSS, TYPE_SALE } from '../../../helpers/constants'
import ProductService from '../../../services/product/ProductService'
import ClienteConsumidorService from '../../../services/consumer/ClienteConsumidorService'
import AutoCompleteProduct from '../product/detail/AutoCompleteProduct'
import AutoCompleteConsumer from './AutoCompleteConsumer'
import EnumService from '../../../services/util/EnumService'
import T from 'i18n-react';
import { Icon } from '../../../domain/Icon';
import Toast from '../../../helpers/Toast';
import SaleService from '../../../services/sale/SaleService'

class Sale extends Component {

    constructor() {
      super();
      this.sendButton = null;
    }

    save(e) {
        
        e.preventDefault();

        if(this.props.saleState.venda.produtos.length === 0) {
            Toast.show('sales.required', Icon.WARNING);
            return;
        }
   
        SaleService.save(this.props.saleState,this.sendButton).then(response => {
            Toast.show(response.messages);
            this.props.clearForm();
        }).catch(erro => {
            Toast.defaultError();
        });
    }

    componentWillUnmount() {
        this.props.clearForm();
    }

    componentDidMount() {
        this.props.loadEnum('tipovenda', updateTypeSale);
    }

    
    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="mode_edit" label="Venda" />
                    <div className="panel">
                        <form onSubmit={this.save.bind(this)}>
                            <div className="row">
                                <div className="col l4">
                                    <AutoCompleteProduct
                                        descricao={this.props.saleState.produtoSelecionado.descricao}
                                        produtos={this.props.saleState.produtosList}
                                        getProduct={this.props.getProduct}
                                        setProduct={this.props.setProduct}
                                        autoCompleteSize="input-field col s12 m12 l12" />
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12">
                                            <input id="quantidade" value={this.props.saleState.quantidade} name="quantidade"  onChange={this.props.handleInputChange} type="number" />
                                            <label htmlFor="quantidade" className={this.props.saleState.quantidade !== "" ? "active" : ""}>Quantidade</label>
                                        </div>
                                    </div>
                                    <AutoCompleteConsumer
                                        nome={this.props.saleState.folhaCaderneta.folhaCaderneta.consumidor.consumidor.nome}
                                        consumidores={this.props.saleState.consumidores}
                                        getConsumer={this.props.getConsumer}
                                        setConsumer={this.props.setConsumer}
                                        autoCompleteSize="input-field col s12 m12 l12" />
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12">
                                            
                                            {this.props.saleState.typeSaleList.map(typeSale =>
                                                (<span key={typeSale.type}>
                                                    {typeSale.type !== TYPE_SALE.A_VISTA_CONSUMIDOR &&
                                                        <span>
                                                            <input type="radio" id={typeSale.type} name="tipoVenda" checked={typeSale.checked} value={typeSale.type}  onChange={this.props.changeRadio.bind(this)} />
                                                            <label htmlFor={typeSale.type} style={{ paddingRight: '20px' }}><T.span text={{ key:typeSale.propertieKey}} /></label>
                                                        </span>
                                                    }
                                                </span>)
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col offset-l1 l7">
                                    <div className="row">
                                        <div className="sales-table">
                                            <table className={TABLE_DEFAULT_CSS}>
                                                <thead>
                                                    <tr>
                                                        <th className="row-th">Código</th>
                                                        <th className="row-th">Descrição do Produto</th>
                                                        <th className="row-th">Quantidade</th>
                                                        <th className="row-th">Valor Unitário</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.saleState.venda.produtos.map((item,i) => {
                                                      return (<tr key={i}>
                                                           <td className="row-td-detail">{item.movimentacaoProduto.produto.codigo}</td>
                                                           <td className="row-td-detail">{item.movimentacaoProduto.produto.descricao}</td>
                                                           <td className="row-td-detail">{item.movimentacaoProduto.produto.quantidade}</td>
                                                           <td className="row-td-detail">{item.movimentacaoProduto.produto.precoVenda} R$</td>
                                                       </tr>)
                                                    })}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s12 offset-m7 offset-l7 m5 l5">
                                            <h5 className="sales-total"> Total: {this.props.saleState.valorTotal} R$ </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <PanelSale addProduct={this.props.addProduct} submitRef={el => this.sendButton = el} />
                        </form>
                    </div>
                </div>
            </div>
        )
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
        setConsumer: (consumer) => {
            dispatch(updateConsumerAutoComplete(consumer));
        },
        changeRadio: (e) => {
            dispatch(changeRadio(e.target.value));
        },
        loadEnum: (name, functionUpdate) => {
            dispatch(EnumService.load(name, functionUpdate));
        },
        addProduct: () => {
            dispatch(addProduct());
        }
    }
}

const SaleContainer = connect(mapStateToProps, mapDispatchToProps)(Sale);
export default SaleContainer;