import React, { Component } from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import MaskedInput from 'react-maskedinput';

export default class Detail extends Component {


    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="business_center" label={this.props.title} />
                    <div className="panel">
                        <form onSubmit={this.props.merge.bind(this)}>
                            <div className="container">
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="nome" ref="nome" disabled={this.props.recommendEdition} value={this.props.consumidor.usuario.nome} name="consumidor.usuario.nome" required onChange={this.props.handleInputChange} type="text" />
                                        <label htmlFor="nome" className={this.props.editMode === 'S' && this.props.consumidor.usuario.nome != null ? 'active' : ''}>Nome</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="email" disabled={this.props.recommendEdition} value={this.props.consumidor.usuario.email} name="consumidor.usuario.email" className="validate" onChange={this.props.handleInputChange} type="email" />
                                        <label htmlFor="email" data-error="Email inválido" className={this.props.editMode === 'S' && this.props.consumidor.usuario.email != null ? 'active' : ''}>Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <MaskedInput  disabled={this.props.recommendEdition} value={this.props.consumidor.usuario.telefone} name="consumidor.usuario.telefone" onChange={this.props.handleInputChange} mask="(11) 11111-1111" required placeholder="Telefone" />
                                    </div>
                                </div>
                            </div>
                            <PanelFooterDetail customButtons={this.props.customButtons} customResponsiveButtons={this.props.customResponsiveButtons} remove={this.props.remove}  submitRef={this.props.submitRef} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}