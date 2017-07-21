import React, { Component } from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import { URL } from '../../../../helpers/constants'
import Toast from '../../../../helpers/Toast'
import { Icon } from '../../../../domain/Icon';
import ModalConfirm from '../../../ModalConfirm'

export default class Detail extends Component {

    merge(e) {

        e.preventDefault();

        if (this.props.setor.id === null) {
            Toast.show('setor.required', Icon.WARNING);
        } else {
            this.props.merge(e);
        }

    }

    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="business_center" label={this.props.title} />
                    <div className="panel">
                        <form onSubmit={this.merge.bind(this)}>
                            <div className="container">
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="nome" ref="nome" value={this.props.nome} name="nome" required onChange={this.props.handleInputChange} type="text" />
                                        <label htmlFor="nome" className={this.props.nome !== '' ? 'active' : ''}>Nome</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="descricao" type="text" required value={this.props.descricao} name="descricao" onChange={this.props.handleInputChange} />
                                        <label htmlFor="descricao" className={this.props.descricao !== '' ? 'active' : ''} >Descrição</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <label htmlFor="setor" className="active">Setor</label>
                                        <select id="setor" className="browser-default" onChange={this.props.handleInputChange} value={this.props.setor.id} name="setor.id" >
                                            <option value=""></option>
                                            {this.props.setores.map(setor => (<option key={setor.id} value={setor.id}>{setor.nome}</option>))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <PanelFooterDetail remove={this.props.showModal} newDetailUrl={URL.NEW_GROUP_PRODUCT} submitRef={this.props.submitRef} />
                        </form>
                    </div>
                </div>
                <ModalConfirm text="Confirma a exclusão do grupo de produto?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
            </div>
        );
    }
}