import React, { Component } from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import ModalConfirm from  '../../../ModalConfirm'
import MaskedInput from 'react-maskedinput';
import { URL } from '../../../../helpers/constants'

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
                                        <input id="nome" ref="nome" disabled={this.props.recommendEdition} value={this.props.clienteConsumidor.consumidor.usuario.nome} name="consumidor.usuario.nome" required onChange={this.props.handleInputChange} type="text" />
                                        <label htmlFor="nome" className={this.props.clienteConsumidor.consumidor.usuario.nome !== '' ? 'active' : ''}>Nome</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <MaskedInput  disabled={this.props.recommendEdition} value={this.props.clienteConsumidor.consumidor.usuario.telefone} name="consumidor.usuario.telefone" onChange={this.props.handleInputChange} mask="(11) 11111-1111" required placeholder="Telefone" />
                                    </div>
                                </div>
                            </div>
                            <PanelFooterDetail customButtons={this.props.customButtons} customResponsiveButtons={this.props.customResponsiveButtons} remove={this.props.showModal} newDetailUrl={URL.NEW_CONSUMER} submitRef={this.props.submitRef} />
                        </form>
                    </div>
                </div>
                <ModalConfirm content="Confirma a exclusão do consumidor?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
            </div>
        );
    }

}