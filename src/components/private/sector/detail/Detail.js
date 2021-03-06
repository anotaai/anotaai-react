import React, { Component } from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import { URL } from '../../../../helpers/constants'
import ModalConfirm from  '../../../ModalConfirm'

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
                                        <input id="nome" ref="nome" value={this.props.nome} name="nome" required onChange={this.props.handleInputChange} type="text" />
                                        <label htmlFor="nome" className={this.props.nome !== ''  ? 'active' : ''}>Nome</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="descricao" type="text" required value={this.props.descricao} name="descricao" onChange={this.props.handleInputChange} />
                                        <label htmlFor="descricao" className={this.props.descricao !== '' ? 'active' : ''} >Descrição</label>
                                    </div>
                                </div>
                            </div>
                            <PanelFooterDetail customButtons={this.props.customButtons} remove={this.props.showModal} customResponsiveButtons={this.props.customResponsiveButtons} newDetailUrl={URL.NEW_SECTOR} submitRef={this.props.submitRef}   />
                        </form>
                    </div>
                </div>
                  <ModalConfirm content="Confirma a exclusão do setor?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
            </div>
        );
    }
}