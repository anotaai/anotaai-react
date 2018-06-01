import React, { Component } from 'react'
import { AUTO_COMPLETE_WRAPPER_STYLE, AUTO_COMPLETE_MENU_STYLE } from '../../../helpers/constants'
import Autocomplete from 'react-autocomplete'

export default class AutoCompleteConsumer extends Component {

    render() {
        return (
            <div className="row">
                <div className="input-field col s10 m10 l10">
                    <label htmlFor="consumer-autocomplete" className="active">Consumidor</label>
                    <Autocomplete
                        inputProps={{ id: 'consumer-autocomplete', placeholder: 'Nome' }}
                        value={this.props.nomeConsumidor}
                        wrapperStyle={AUTO_COMPLETE_WRAPPER_STYLE}
                        menuStyle={AUTO_COMPLETE_MENU_STYLE}
                        renderItem={(item, isHighlighted) =>
                            <div id={item.id} key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white', cursor: 'pointer' }}>
                                {item.nomeConsumidor}
                            </div>
                        }
                        renderMenu={(items, value, style) => (
                            <div key={value} >
                                {items.length === 0 && value !== '' ? (<div style={{ padding: 6 }}><i className="material-icons icon-autocomplete">clear</i>Nenhum registro encontrado para {value}</div>) : <div style={{ ...style, ...this.menuStyle }} children={items} />}
                            </div>
                        )}
                        items={this.props.consumidores}
                        getItemValue={(item) => item.nomeConsumidor}
                        onSelect={(value, item) => {
                            this.props.setConsumer(item);
                        }}
                        onChange={(event, value) => {
                            this.props.getConsumer('consumidorSelecionado.nomeConsumidor', value);
                        }} />
                </div>
                <div className="input-field col s2 m2 l2">
                    <button className="btn-floating" type="button" onClick={this.props.removeConsumer}><i className="material-icons">delete</i></button>
                </div>
                {this.props.values}
            </div>
        )
    }
}