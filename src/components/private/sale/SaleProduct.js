import React, { Component } from 'react'
import { PanelHeader, PanelSale } from '../../panels'
import { TABLE_DEFAULT_CSS, TYPE_SALE } from '../../../helpers/constants'
import AutoCompleteProduct from '../product/detail/AutoCompleteProduct'
import AutoCompleteConsumer from './AutoCompleteConsumer'
import SimpleCurrencyInput from 'react-simple-currency'
import T from 'i18n-react'
import ModalConfirm from '../../ModalConfirm'


export default class SaleProduct extends Component {

    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="mode_edit" label="Venda" />
                    <div className="panel">
                        <form onSubmit={this.props.save}>
                            <div className="row">
                                <div className="col l4">
                                    <AutoCompleteProduct
                                        descricao={this.props.produtoSelecionado.descricao}
                                        produtos={this.props.produtosList}
                                        getProduct={this.props.getProduct}
                                        setProduct={this.props.setProduct}
                                        autoCompleteSize="input-field col s12 m12 l12" />
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12">
                                            <input id="quantidade" value={this.props.quantidade} name="quantidade" onChange={this.props.handleInputChange} type="number" />
                                            <label htmlFor="quantidade" className={this.props.quantidade !== "" ? "active" : ""}>Quantidade</label>
                                        </div>
                                    </div>
                                    <AutoCompleteConsumer
                                        userName={this.props.folhaCaderneta.consumidor.usuario.nome}
                                        consumidores={this.props.consumidores}
                                        getConsumer={this.props.getConsumer}
                                        setConsumer={this.props.setConsumer}
                                        autoCompleteSize="input-field col s12 m12 l12" />
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12">

                                            {this.props.typeSaleList.map(typeSale =>
                                                (<span key={typeSale.type}>
                                                    {typeSale.type !== TYPE_SALE.A_VISTA_CONSUMIDOR &&
                                                        <span>
                                                            <input type="radio" id={typeSale.type} name="tipoVenda" checked={typeSale.checked} value={typeSale.type} onChange={this.props.changeRadio.bind(this)} />
                                                            <label htmlFor={typeSale.type} style={{ paddingRight: '20px' }}><T.span text={{ key: typeSale.propertieKey }} /></label>
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
                                                        <th className="row-th">Item</th>
                                                        <th className="row-th">Código</th>
                                                        <th className="row-th">Produto</th>
                                                        <th className="row-th">Quantidade</th>
                                                        <th className="row-th">Valor R$</th>
                                                        <th className="row-th">Total R$</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.produtos.map((item, i) => {
                                                        return (<tr key={i}>
                                                            <td className="row-td-detail">{i + 1}</td>
                                                            <td className="row-td-detail">{item.movimentacaoProduto.produto.codigo}</td>
                                                            <td className="row-td-detail">{item.movimentacaoProduto.produto.descricaoResumida}</td>
                                                            <td className="row-td-detail">{item.movimentacaoProduto.quantidade}</td>
                                                            <td className="row-td-detail">{item.movimentacaoProduto.produto.precoVenda}</td>
                                                            <td className="row-td-detail">{item.movimentacaoProduto.produto.precoTotal}</td>
                                                        </tr>)
                                                    })}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s12 offset-m7 offset-l7 m5 l5">
                                            <h5 className="sales-total"> Total: {this.props.valorTotal} R$ </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <PanelSale addProduct={this.props.addProduct} submitRef={this.props.submitRef} />

                            <ModalConfirm
                                title="Dados Pagamento"
                                confirm={this.props.save}
                                labelOk="Pagar"
                                normalAlign="row"
                                hideModal={this.props.hideModalToSale}
                                showModalState={this.props.showModalState}
                                content={
                                  <FormPayment
                                    quantidadeTotal={this.props.quantidadeTotal}
                                    valorPagamento={this.props.valorPagamento}
                                    valorTotal={this.props.valorTotal}
                                    handleNumericChange={this.props.handleNumericChange} />} 
                            />
                        </form>
                    </div>
                </div>
            </div>
        )
    }


}

export function FormPayment(props) {
    return (
         
            <span>
                <div className="col s12 m12 l12">
                  <label className="label-detail"> Valor Total </label>
                  <label>{props.valorTotal} </label>   
                </div>
                <div className="col s12 m12 l12">
                   <label className="label-detail"> Qtd Itens </label>
                   <label>{props.quantidadeTotal} </label> 
                </div>
                <div className="input-field col s12 m12 l12" style={{marginTop:'30px'}}>
                    <label htmlFor="valorPagamento" className="active">Valor Pago</label>
                    <SimpleCurrencyInput id="valorPagamento" value={props.valorPagamento} unit="R$" name="valorPagamento" onInputChange={props.handleNumericChange.bind(this, 'valorPagamento')} />
                </div>

            </span>
        
    )
}