import React, { Component } from 'react';
import { AUTO_COMPLETE_WRAPPER_STYLE, AUTO_COMPLETE_MENU_STYLE } from '../../../../helpers/constants';
import Autocomplete from 'react-autocomplete';
import T from 'i18n-react';

export default class AutoCompleteProduct extends Component {

    render() {
        return (
            <div className="row">
                <div className="input-field col s10 m10 l10">

                    <label htmlFor="product-autocomplete" className="active">Produto</label>

                    <Autocomplete
                        inputProps={{ id: 'product-autocomplete', style: { margin: '0px' }, placeholder: 'Descrição' }}
                        value={this.props.descricao}
                        wrapperStyle={AUTO_COMPLETE_WRAPPER_STYLE}
                        menuStyle={AUTO_COMPLETE_MENU_STYLE}
                        renderItem={(item, isHighlighted) =>
                            <div id={`product_${item.id}`} key={`product_${item.id}`} style={{ background: isHighlighted ? 'lightgray' : 'white', cursor: 'pointer' }}>
                                {item.descricao}
                            </div>
                        }
                        renderMenu={(items, value, style) => (
                            <div>
                                {
                                    items.length > 0 && value !== '' ? 
                                    <div style={{ ...style, ...this.menuStyle }} children={items} /> :
                                    value !== '' ?
                                    (<div>
                                        <i className="material-icons icon-autocomplete">clear</i>
                                        {T.translate('mensagem.nenhumitemencontrado')}
                                    </div>) : ''
                                    
                                }
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
                <div className="input-field col s2 m2 l2">
                    <button className="btn-floating" type="button" onClick={this.props.removeProduct}><i className="material-icons">delete</i></button>
                </div>
                {this.props.values}
            </div>
        )
    }
}