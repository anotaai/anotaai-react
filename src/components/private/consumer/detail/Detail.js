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
                                        <input id="nome" ref="nome" value={this.props.userLogin.usuario.nome} name="userLogin.usuario.nome" required onChange={this.props.handleInputChange} type="text" />
                                        <label htmlFor="nome" className={this.props.editMode === 'S' && this.props.userLogin.usuario.nome != null ? 'active' : ''}>Nome</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="email" value={this.props.userLogin.usuario.email} name="userLogin.usuario.email" className="validate" onChange={this.props.handleInputChange} type="email" />
                                        <label htmlFor="email" data-error="Email inválido" className={this.props.editMode === 'S' && this.props.userLogin.usuario.email != null ? 'active' : ''}>Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <MaskedInput  value={this.props.userLogin.usuario.telefone} name="userLogin.usuario.telefone" onChange={this.props.handleInputChange} mask="(11) 11111-1111" required placeholder="Telefone" />
                                    </div>
                                </div>
                            </div>
                            <PanelFooterDetail customButtons={this.props.customButtons} customResponsiveButtons={this.props.customResponsiveButtons}  submitRef={this.props.submitRef} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}