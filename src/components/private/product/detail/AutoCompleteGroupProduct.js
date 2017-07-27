import React, { Component } from 'react'
import { AUTO_COMPLETE_WRAPPER_STYLE, AUTO_COMPLETE_MENU_STYLE } from '../../../../helpers/constants'
import Autocomplete from 'react-autocomplete'
import { TABLE_DEFAULT_CSS } from '../../../../helpers/constants'


export default class AutoCompleteGroupProduct extends Component {

    render() {
        return (
            <div className="row">
                <div className="input-field col s12 m10 l10">

                    <label htmlFor="group-product-autocomplete" className="active">Grupo Produto</label>

                    <Autocomplete
                        inputProps={{ id: 'group-product-autocomplete', placeholder: 'Nome' }}
                        value={this.props.nome}
                        wrapperStyle={AUTO_COMPLETE_WRAPPER_STYLE}
                        menuStyle={AUTO_COMPLETE_MENU_STYLE}
                        renderItem={(item, isHighlighted) =>
                            <div id={item.id} key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white', cursor: 'pointer' }}>
                                {item.nome}
                            </div>
                        }
                        renderMenu={(items, value, style) => (
                            <div>
                                {items.length === 0 && value !== '' ? (<div style={{ padding: 6 }}><i className="material-icons icon-autocomplete">clear</i>Nenhum registro encontrado para {value}</div>) : <div style={{ ...style, ...this.menuStyle }} children={items} />}
                            </div>
                        )}
                        items={this.props.gruposTableList}
                        getItemValue={(item) => item.nome}
                        onSelect={(value, item) => {
                            this.props.setGroupProduct(item);
                        }}

                        onChange={(event, value) => {
                            this.props.getGroupProduct('grupoProdutoSelecionado.nome', value);
                        }} />
                </div>

                <div className="input-field col s12 m2 l2" style={{ paddingTop: '10px' }}>
                    <button type="button" className="btn  waves-effect INFO" title="Adicionar" onClick={this.props.updateGroupProductTableItens} >
                        <i className="material-icons center">file_download</i>
                    </button>
                </div>
                {this.props.grupos.length > 0 &&
                    <div className="row">
                        <div className="col s12 offset-m1 m9 offset-l1 l9">    
                            <table className={TABLE_DEFAULT_CSS}>
                                <thead>
                                    <tr>
                                        <th className="row-th">Principal</th>
                                        <th className="row-th">Nome</th>
                                        <th className="row-th">Excluir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.grupos.map((item) => {
                                        
                                        return (
                                            <tr key={item.grupoProduto.id}>
                                                <td className="row-td-detail">
                                                      <input type="radio" id={"ehPrincipal_" + item.grupoProduto.id} name="ehPrincipal" checked={item.ehPrincipal} value={item.ehPrincipal} onChange={this.props.changeGroupProductRadio.bind(this,item.grupoProduto.id)}/>
                                                      <label htmlFor={"ehPrincipal_" + item.grupoProduto.id}></label>
                                                </td>
                                                <td className="row-td-detail">{item.grupoProduto.nome}</td>
                                                <td className="row-td"><a onClick={this.props.removeGroupProduct.bind(this, item.grupoProduto.id)} style={{ color: 'black' }}><i className="material-icons">delete</i></a></td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>}
            </div>
        )
    }
}
