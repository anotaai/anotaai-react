import React, { Component } from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import { URL } from '../../../../helpers/constants'
import ModalConfirm from '../../../ModalConfirm'
import AutoCompleteProduct from '../../product/detail/AutoCompleteProduct'
import { TABLE_DEFAULT_CSS } from '../../../../helpers/constants'
import SimpleCurrencyInput from 'react-simple-currency'
import { Icon } from '../../../../domain/Icon';
import Toast from '../../../../helpers/Toast';
import { pushEncoded } from '../../../App';

export default class Detail extends Component {

    merge(e) {

        if (!this.props.itens == null || this.props.itens.length === 0) {
            e.preventDefault();
            Toast.show('produto.required', Icon.WARNING);
            return;
        }
        this.props.merge(e);
    }

    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="list" label={this.props.title} />
                    <div className="panel">
                        <form onSubmit={this.merge.bind(this)}>
                            <div className="container">

                                {this.props.codigo !== '' &&
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12">
                                            <input value={this.props.codigo} disabled />
                                            <label htmlFor="nome" className="active">Código</label>
                                        </div>
                                    </div>
                                }

                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="date" ref="date" value={this.props.dataEntrada} name="dataEntrada" required onChange={this.props.handleInputChange} type="date" />
                                        <label htmlFor="nome" className="active">Data entrada</label>
                                    </div>
                                </div>

                                <AutoCompleteProduct
                                    descricao={this.props.produtoSelecionado.descricao}
                                    produtos={this.props.produtos}
                                    getProduct={this.props.getProduct}
                                    setProduct={this.props.setProduct}
                                    handleInputChange={this.props.handleInputChange}
                                    updateTableItens={this.props.updateTableItens}
                                    autoCompleteSize="input-field col s12 m6 l6"
                                    values={
                                        <div>
                                            <div className="input-field col s12 m2 l2">
                                                <label htmlFor="precoCusto" className="active">Custo</label>
                                                <SimpleCurrencyInput id="precoCusto" value={this.props.precoCusto} unit='R$' name="precoCusto" onInputChange={this.props.handleNumericChange.bind(this, 'precoCusto')} />
                                            </div>
                                            <div className="input-field col s12 m2 l2">
                                                <label htmlFor="quantidade" className="active">Quantidade</label>
                                                <input type="number" value={this.props.quantidade} placeholder="Valor" name="quantidade" onChange={this.props.handleInputChange} />
                                            </div>
                                            <div className="input-field col s12 m2 l2" style={{ paddingTop: '10px' }}>
                                                <button type="button" className="btn  waves-effect INFO" title="Adicionar" onClick={this.props.updateTableItens} >
                                                    <i className="material-icons center">file_download</i>
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    onChange={this.props.handleInputChange} />


                                {this.props.itens.length > 0 &&

                                    <div className="row">
                                        <div className="col s12 m12 l12">
                                            <table className={TABLE_DEFAULT_CSS}>

                                                <thead>
                                                    <tr>
                                                        <th className="row-th">Produto</th>
                                                        <th className="row-th">R$Custo</th>
                                                        <th className="row-th">Quantidade</th>
                                                        <th className="row-th">{this.props.editMode !== 'S' ? 'Excluir' : 'Estornar'}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.itens.map(item => {
                                                        return (
                                                            <tr key={item.movimentacaoProduto.produto.id}>

                                                                <td className="row-td-detail">{item.movimentacaoProduto.produto.descricao}</td>
                                                                <td className="row-td-detail">{item.precoCusto}</td>
                                                                <td className="row-td-detail">{item.movimentacaoProduto.quantidade}</td>
                                                                <td className="row-td"><a onClick={this.props.editMode !== 'S' ? this.props.removeProduct.bind(this, item.movimentacaoProduto.produto.id) : pushEncoded.bind(this, URL.MAIN_DELETE_COMMODITY, this.props.id)} style={{ color: 'black' }}><i className="material-icons">delete</i></a></td>
                                                            </tr>)
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>}
                            </div>
                            {this.props.editMode !== 'S' &&
                                <PanelFooterDetail remove={this.props.showModal} newDetailUrl={URL.NEW_COMMODITY} submitRef={this.props.submitRef} />
                            }
                        </form>
                    </div>
                </div>
                <ModalConfirm content="Confirma a exclusão da entrada de mercadoria?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
            </div>
        );
    }
}