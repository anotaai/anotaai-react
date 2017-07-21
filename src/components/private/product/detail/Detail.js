import React, { Component } from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import { URL, CHIPS_THEME } from '../../../../helpers/constants'
import SimpleCurrencyInput from 'react-simple-currency'
import Chips from 'react-chips'
import { Icon } from '../../../../domain/Icon';
import Toast from '../../../../helpers/Toast';
import ModalConfirm from '../../../ModalConfirm'
import AutoCompleteProduct from './AutoCompleteProduct'
import { TABLE_DEFAULT_CSS } from '../../../../helpers/constants'

export default class Detail extends Component {

    merge(e) {

        if (!this.props.codigoGerado && this.props.codigo === '') {
            e.preventDefault();
            Toast.show('codigo.required', Icon.WARNING);
            return;
        }

        this.props.merge(e);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.merge.bind(this)}>
                    <div className="space-container">
                        <div className="container">
                            <PanelHeader icon="business_center" label={this.props.title} />
                            <div className="panel">
                                <div className="container">
                                    <div className="row center-align">
                                        <div className="input-field col s6 m6 l6">
                                            <input type="checkbox" id="codigoProduto" name="codigoGerado" value={this.props.codigoGerado} onClick={this.props.handleCheckbox} />
                                            <label htmlFor="codigoProduto">Gerar código Produto</label>
                                        </div>
                                        <div className="input-field col s6 m6 l6">
                                            <input type="checkbox" id="insumo" value={this.props.ehInsumo} name="insumo" onClick={this.props.handleCheckbox} />
                                            <label htmlFor="insumo">Insumo</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12">
                                            <input id="codigo" ref="codigo" value={this.props.codigo} name="codigo" onChange={this.props.handleInputChange} disabled={this.props.blockCode} type="number" />
                                            <label htmlFor="codigo" className={this.props.codigo !== '' ? 'active' : ''}>Código</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12">
                                            <input id="descricao" value={this.props.descricao} name="descricao" onChange={this.props.handleInputChange} type="text" required />
                                            <label htmlFor="descricao" className={this.props.descricao !== '' ? 'active' : ''}>Descrição</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12">
                                            <label htmlFor="unidadeMedida" className="active">Unidade de Medida</label>
                                            <select id="unidadeMedida" className="browser-default" required onChange={this.props.handleInputChange} value={this.props.unidadeMedida.type} name="unidadeMedida.type" >
                                                <option value=""></option>
                                                {this.props.unidadeList.map(unidade => (<option key={unidade.type} value={unidade.type}>{unidade.descricao}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12">
                                            <input id="descricaoResumida" value={this.props.descricaoResumida} name="descricaoResumida" onChange={this.props.handleInputChange} type="text"/>
                                            <label htmlFor="descricaoResumida" className={this.props.descricaoResumida !== '' ? 'active' : ''}>Descrição Resumida</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12">
                                            <label htmlFor="precoVenda" className="active">Preço</label>
                                            <SimpleCurrencyInput id="precoVenda" value={this.props.precoVenda} unit='R$' name="precoVenda" onInputChange={this.props.handleNumericChange.bind(this, 'precoVenda')} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12">
                                            <label htmlFor="dias" className="active" style={{ paddingBottom: '8px' }} >Disponibilidade</label>
                                            <Chips id="dias" theme={CHIPS_THEME}
                                                value={this.props.diasDisponibilidade}
                                                onChange={this.props.updateAvailableDays}
                                                suggestions={this.props.diasSemana} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-container">
                        <div className="container">
                            <PanelHeader icon="library_books" label="Itens Receita" />
                            <div className="panel">
                                <div className="container">
                                    <AutoCompleteProduct
                                        descricao={this.props.produtoSelecionado.descricao}
                                        produtos={this.props.produtos}
                                        getProduct={this.props.getProduct}
                                        setProduct={this.props.setProduct}
                                        handleInputChange={this.props.handleInputChange}
                                        updateTableItens={this.props.updateTableItens}
                                        autoCompleteSize="input-field col s12 m8 l8"
                                        values={
                                          <div className="input-field col s12 m2 l2">
                                            <label htmlFor="quantidade" className="active">Quantidade</label>
                                            <input type="number" value={this.props.quantidade} placeholder="Valor" name="quantidade" onChange={this.props.handleInputChange} />
                                           </div> } />
                                        
                                     {this.props.itensReceita.length > 0 &&

                                        <div className="row">
                                            <div className="col s12 offset-m1 m9 offset-l1 l9">
                                                <table className={TABLE_DEFAULT_CSS}>
                                                    <thead>
                                                        <tr>
                                                            <th className="row-th">Produto</th>
                                                            <th className="row-th">Quantidade</th>
                                                            <th className="row-th">Excluir</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.props.itensReceita.map(item => {
                                                            return (
                                                                <tr key={item.ingrediente.id}>
                                                                    <td className="row-td-detail">{item.ingrediente.descricao}</td>
                                                                    <td className="row-td-detail">{item.quantidade}</td>
                                                                    <td className="row-td"><a onClick={this.props.removeProduct.bind(this, item.ingrediente.id)} style={{ color: 'black' }}><i className="material-icons">delete</i></a></td>
                                                                </tr>)
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>}
                                </div>
                               <PanelFooterDetail remove={this.props.showModal} newDetailUrl={URL.NEW_PRODUCT} submitRef={this.props.submitRef} />
                            </div>
                        </div>
                    </div>
                </form>
                <ModalConfirm text="Confirma a exclusão do produto?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
            </div>
        );
    }
}