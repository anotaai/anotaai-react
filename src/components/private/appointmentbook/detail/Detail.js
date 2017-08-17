import React, { Component } from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import ModalConfirm from '../../../ModalConfirm'
import { URL } from '../../../../helpers/constants'

export default class Detail extends Component {


    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="library_books" label={this.props.title} />
                    <div className="panel">
                        <form onSubmit={this.props.merge.bind(this)}>
                            <div className="container">
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="qtdDiasDuracaoFolha" value={this.props.qtdDiasDuracaoFolha} name="qtdDiasDuracaoFolha" required onChange={this.props.handleInputChange}  type="number" />
                                        <label htmlFor="qtdDiasDuracaoFolha" className={this.props.qtdDiasDuracaoFolha !== null ? 'active' : ''}>Quantidade dias duração folha</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="diaBase" value={this.props.diaBase} name="diaBase" required onChange={this.props.handleInputChange}  type="number" />
                                        <label htmlFor="diaBase" className={this.props.diaBase !== null ? 'active' : ''}>Dia base</label>
                                    </div>
                                </div>
                            </div>
                            <PanelFooterDetail customButtons={this.props.customButtons} customResponsiveButtons={this.props.customResponsiveButtons} remove={this.props.showModal} newDetailUrl={URL.NEW_APPOINTMENT_BOOK} submitRef={this.props.submitRef} />
                        </form>
                    </div>
                </div>
                <ModalConfirm text="Confirma a exclusão da caderneta?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
            </div>
        )
    }
}