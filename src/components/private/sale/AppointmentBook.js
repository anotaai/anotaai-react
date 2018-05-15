import React, { Component } from 'react';
import { PanelHeader } from '../../panels'

export default class AppointmentBook extends Component {

    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="mode_edit" label="Seleção Caderneta para Venda" />
                    <div className="panel">
                        <div className="row center-align">
                        {this.props.cadernetas.map(caderneta =>
                            (<span key={caderneta.id}>
                                <button className="btn-large waves-effect buttons-space buttons-space-top SUCCESS" type="button" onClick={this.props.redirectSaleProduct.bind(this, caderneta)} >
                                   {caderneta.descricao}<i className="material-icons right">library_books</i> 
                                 </button>
                             </span> 
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}