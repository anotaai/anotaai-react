import React, { Component } from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import { URL, CHIPS_THEME, AUTO_COMPLETE_WRAPPER_STYLE, AUTO_COMPLETE_MENU_STYLE } from '../../../../helpers/constants'
import SimpleCurrencyInput from 'react-simple-currency'
import Chips from 'react-chips'
import Autocomplete from 'react-autocomplete'

export default class Detail extends Component {

    render() {
        return (
            <form onSubmit={this.props.merge.bind(this)}>
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
                                        <input id="codigo" ref="codigo" value={this.props.codigo} name="codigo" onChange={this.props.handleInputChange} disabled={this.props.blockCode} type="number" required />
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
                                        <select className="browser-default" onChange={this.props.handleInputChange} value={this.props.unidadeMedida.type} name="unidadeMedida.type" >
                                            <option value="">Unidade de Medida</option>
                                            {this.props.unidadeList.map(unidade => (<option key={unidade.type} value={unidade.type}>{unidade.descricao}</option>))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="descricaoResumida" value={this.props.descricaoResumida} name="descricaoResumida" onChange={this.props.handleInputChange} type="text" required />
                                        <label htmlFor="descricaoResumida" className={this.props.descricaoResumida !== '' ? 'active' : ''}>Descrição Resumida</label>
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
                                <div className="row">

                                    <div className="input-field col s12 m12 l12">
                                        <label htmlFor="precoVenda" className="active">Preço</label>
                                        <SimpleCurrencyInput id="precoVenda" value={this.props.precoVenda} unit='R$' precision={2} separator=',' delimiter='.' name="precoVenda" onChange={this.props.handleInputChange} />
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

                                <div className="row">
                                    <div className="input-field col s12 m8 l8">

                                        <label htmlFor="product-autocomplete" className="active">Receita</label>

                                        <Autocomplete
                                            inputProps={{ id: 'product-autocomplete', placeholder: 'Descrição' }}
                                            value={this.props.produtoSelecionado.descricao}
                                            wrapperStyle={AUTO_COMPLETE_WRAPPER_STYLE}
                                            menuStyle={AUTO_COMPLETE_MENU_STYLE}
                                            renderItem={(item, isHighlighted) =>
                                                <div id={item.id} key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                    {item.descricao}
                                                </div>
                                            }
                                            items={this.props.produtos}
                                            getItemValue={(item) => item.descricao}
                                            onSelect={(value, item) => {
                                                this.props.setProduct(item);
                                            }}

                                            onChange={(event, value) => {
                                                this.props.getProduct('produtoSelecionado.descricao', value);
                                            }} />
                                    </div>
                                    <div className="input-field col s12 m2 l2">
                                        <input type="number" value={this.props.qtdProduct} placeholder="Quantidade" name="qtdProduct" onChange={this.props.handleInputChange} />
                                    </div>
                                    <div className="input-field col s12 m2 l2" style={{ paddingTop: '10px' }}>
                                        <button type="button" className="btn  waves-effect INFO" title="Adicionar" onClick={this.props.updateTableItens} >
                                            <i className="material-icons center">file_download</i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {this.props.itensReceita.length > 0 &&

                                <div className="row">
                                    <div className="col s12 offset-m2 m7 offset-l2 l7">
                                        <table className="striped bordered">
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
                            <PanelFooterDetail customButtons={this.props.customButtons} customResponsiveButtons={this.props.customResponsiveButtons} searchUrl={URL.GROUP_PRODUCT} submitRef={this.props.submitRef} />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}