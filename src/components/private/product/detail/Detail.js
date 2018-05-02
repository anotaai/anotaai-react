import React, { Component } from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import { URL, CHIPS_THEME } from '../../../../helpers/constants'
import SimpleCurrencyInput from 'react-simple-currency'
import Chips from 'react-chips'
import ModalConfirm from '../../../ModalConfirm'
import AutoCompleteProduct from './AutoCompleteProduct'
import AutoCompleteGroupProduct from './AutoCompleteGroupProduct'
import { TABLE_DEFAULT_CSS } from '../../../../helpers/constants'
import Collapse, { Panel } from 'rc-collapse';

export default class Detail extends Component {

    render() {
        return (
            <div>
                <form onSubmit={this.props.merge.bind(this)}>
                    <div className="space-container">
                        <div className="container">
                            <PanelHeader icon="shopping_cart" label={this.props.title} />
                            <div className="panel">
                                <div className="container">
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12">
                                            <input type="checkbox" id="insumo" value={this.props.ehInsumo} name="insumo" onClick={this.props.handleCheckbox} />
                                            <label htmlFor="insumo">Insumo</label>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="input-field col s12 m12 l12">
                                            <input id="codigo"  value={this.props.codigo} name="codigo" disabled="true"  type="number" />
                                            <label htmlFor="codigo" className={this.props.codigo !== '' ? 'active' : ''} >Código</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12">
                                            <input id="codigoBarras" ref="codigoBarras" value={this.props.codigoBarras} required name="codigoBarras" onChange={this.props.handleInputChange}  type="number" />
                                            <label htmlFor="codigoBarras" className={this.props.codigoBarras !== '' ? 'active' : ''} >Código de Barras</label>
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
                                            <input id="descricaoResumida" value={this.props.descricaoResumida} name="descricaoResumida" onChange={this.props.handleInputChange} type="text" />
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
                                            <label htmlFor="tipoArmazenamento" className="active">Tipo Armazenamento</label>
                                            <select id="tipoArmazenamento" className="browser-default" required onChange={this.props.handleInputChange} value={this.props.tipoArmazenamento.type} name="tipoArmazenamento.type" >
                                                <option value=""></option>
                                                {this.props.armazenamentoList.map(armazenamento => (<option key={armazenamento.type} value={armazenamento.type}>{armazenamento.descricao}</option>))}
                                            </select>
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
                            <Collapse onChange={this.props.toggleGroupProductAccordion} accordion={this.props.groupProductAccordionState === '1' ? true : false} activeKey={this.props.groupProductAccordionState}>
                                <Panel header={`Grupo Produto`} key="1">
                                    <div className="container">
                                        <AutoCompleteGroupProduct
                                            nome={this.props.grupoProdutoSelecionado.nome}
                                            grupos={this.props.grupos}
                                            gruposTableList={this.props.gruposTableList}
                                            updateGroupProductTableItens={this.props.updateGroupProductTableItens}
                                            removeGroupProduct={this.props.removeGroupProduct}
                                            changeGroupProductRadio={this.props.changeGroupProductRadio}
                                            getGroupProduct={this.props.getGroupProduct}
                                            setGroupProduct={this.props.setGroupProduct} />
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                    <div className="space-container">
                        <div className="container">
                            <Collapse onChange={this.props.toggleCommodityAccordion} accordion={this.props.commodityAccordionState === '1' ? true : false} activeKey={this.props.commodityAccordionState}>
                                <Panel header={`Itens Receita`} key="1" >
                                    <div className="container">
                                        <AutoCompleteProduct
                                            descricao={this.props.produtoSelecionado.descricao}
                                            produtos={this.props.produtos}
                                            getProduct={this.props.getProduct}
                                            setProduct={this.props.setProduct}
                                            updateTableItens={this.props.updateTableItens}
                                            autoCompleteSize="input-field col s12 m8 l8"
                                            values={
                                                <div>
                                                    <div className="input-field col s12 m2 l2">
                                                        <label htmlFor="quantidade" className="active">Quantidade</label>
                                                        <input type="number" value={this.props.quantidade} placeholder="Valor" name="quantidade" onChange={this.props.handleInputChange} />
                                                    </div>
                                                    <div className="input-field col s12 m2 l2" style={{ paddingTop: '10px' }}>
                                                        <button type="button" className="btn  waves-effect INFO" title="Adicionar" onClick={this.props.updateTableItens} >
                                                            <i className="material-icons center">file_download</i>
                                                        </button>
                                                    </div>
                                                </div>} />

                                        {this.props.itensReceita.length > 0 &&

                                            <div className="row">
                                                <div className="col s12 m12 l12">
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
                                            </div>
                                        }
                                    </div>
                                    <PanelFooterDetail remove={this.props.showModal} newDetailUrl={URL.NEW_PRODUCT} submitRef={this.props.submitRef} customButtons={this.props.customButtons} customResponsiveButtons={this.props.customResponsiveButtons} />
                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                </form>
                <ModalConfirm title="Dados Mercadoria"
                    confirm={this.props.enterCommodity !== undefined ? this.props.enterCommodity.bind(this) : undefined}
                    hideModal={this.props.hideModalCommodity}
                    showModalState={this.props.showModalCommodityState}
                    content={<FormIncludeCommodity
                        quantidadeCommodity={this.props.quantidadeCommodity}
                        precoCustoCommodity={this.props.precoCustoCommodity}
                        handleNumericChange={this.props.handleNumericChange}
                        handleInputChange={this.props.handleInputChange} />} />
                <ModalConfirm content="Confirma a exclusão do produto?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
            </div>
        );
    }
}

export function FormIncludeCommodity(props) {
    return (
        <span>
            <div className="input-field col s12 m12 l12">
                <label htmlFor="quantidade" className="active">Quantidade</label>
                <input type="number" value={props.quantidadeCommodity} placeholder="Valor" name="quantidadeCommodity" onChange={props.handleInputChange} />
            </div>
            <div className="input-field col s12 m12 l12">
                <label htmlFor="precoCusto" className="active">Custo</label>
                <SimpleCurrencyInput id="precoCusto" value={props.precoCustoCommodity} unit="R$" name="precoCustoCommodity" onInputChange={props.handleNumericChange.bind(this, 'precoCustoCommodity')} />
            </div>
        </span>
    )
}