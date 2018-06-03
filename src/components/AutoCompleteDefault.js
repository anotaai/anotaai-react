import React, { Component } from 'react';
import { AUTO_COMPLETE_WRAPPER_STYLE, AUTO_COMPLETE_MENU_STYLE } from '../helpers/constants';
import Autocomplete from 'react-autocomplete';
import T from 'i18n-react';

export default class AutoCompleteDefault extends Component {

    render() {
        return (
            <div className="row">
                <div className="input-field col s10 m10 l10">
                    <label htmlFor={this.props.inputId} className="active">{this.props.textLabel}</label>
                    <Autocomplete
                        inputProps={{ id: this.props.inputId, style: { margin: '0px' }, placeholder: this.props.placeholder }}
                        value={this.props.inputValue}
                        wrapperStyle={AUTO_COMPLETE_WRAPPER_STYLE}
                        menuStyle={AUTO_COMPLETE_MENU_STYLE}
                        renderItem={(item, isHighlighted) =>
                            <div id={`${this.props.inputId}_${item.id}`} key={`${this.props.inputId}_${item.id}`} style={{ background: isHighlighted ? 'lightgray' : 'white', cursor: 'pointer' }}>
                                {this.props.getLabel(item)}
                            </div>
                        }
                        renderMenu={(items, value, style) => (
                            <div key={value} >
                                {items.length > 0 && value !== '' ? 
                                    <div style={{ ...style, ...this.menuStyle }} children={items} /> : 
                                    value !== '' ?
                                    <div>
                                        <i className="material-icons icon-autocomplete">clear</i>
                                       {T.translate('mensagem.nenhumitemencontrado')}
                                    </div> : ''
                                }
                            </div>
                        )}
                        items={this.props.itens}
                        getItemValue={(item) => this.props.getLabel(item)}
                        onSelect={(value, item) => {
                            this.props.selectItem(item);
                        }}
                        onChange={(event, value) => {
                            this.props.search(value);
                        }} />
                </div>
                <div className="input-field col s2 m2 l2">
                    <button key={`${this.props.inputId}_remove`} className="btn-floating" type="button" onClick={() => this.props.remove(this.props.target)}>
                        <i className="material-icons">delete</i>
                    </button>
                </div>
                {this.props.values}
            </div>
        )
    }
}