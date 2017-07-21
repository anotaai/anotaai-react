import React, { Component } from 'react'
import { AUTO_COMPLETE_WRAPPER_STYLE, AUTO_COMPLETE_MENU_STYLE } from '../../../../helpers/constants'
import Autocomplete from 'react-autocomplete'

export default class AutoCompleteProduct extends Component {

    render() {
        return (
            <div className="row">
                <div className={this.props.autoCompleteSize}>

                    <label htmlFor="product-autocomplete" className="active">Produto</label>

                    <Autocomplete
                        inputProps={{ id: 'product-autocomplete', placeholder: 'Descrição' }}
                        value={this.props.descricao}
                        wrapperStyle={AUTO_COMPLETE_WRAPPER_STYLE}
                        menuStyle={AUTO_COMPLETE_MENU_STYLE}
                        renderItem={(item, isHighlighted) =>
                            <div id={item.id} key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white', cursor: 'pointer' }}>
                                {item.descricao}
                            </div>
                        }

                        renderMenu={(items, value, style) => (
                            <div>
                                {items.length === 0 && value !== '' ? (<div style={{ padding: 6 }}><i className="material-icons icon-autocomplete">clear</i>Nenhum registro encontrado para {value}</div>) : <div style={{ ...style, ...this.menuStyle }} children={items} />}
                            </div>
                        )}
                        items={this.props.produtos}
                        getItemValue={(item) => item.descricao}
                        onSelect={(value, item) => {
                            this.props.setProduct(item);
                        }}

                        onChange={(event, value) => {
                            this.props.getProduct('produtoSelecionado.descricao', value);
                        }} />
                </div>
                
                    {this.props.values}
               
                <div className="input-field col s12 m2 l2" style={{ paddingTop: '10px' }}>
                    <button type="button" className="btn  waves-effect INFO" title="Adicionar" onClick={this.props.updateTableItens} >
                        <i className="material-icons center">file_download</i>
                    </button>
                </div>
            </div>
        )
    }
}