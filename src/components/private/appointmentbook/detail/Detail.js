import React, { Component } from 'react';
import { PanelHeader, PanelFooterDetail } from '../../../panels';
import ModalConfirm from '../../../ModalConfirm';
import { URL } from '../../../../helpers/constants';
import { Icon } from '../../../../domain/Icon';
import Toast from '../../../../helpers/Toast';

export default class Detail extends Component {

    merge(e) {
         
        if (!this.props.cadernetas == null || this.props.cadernetas.length === 0) {
            e.preventDefault();
            Toast.show('cadernetas.required', Icon.WARNING);
            return;
        }
        this.props.merge(e);
    }

    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="library_books" label={this.props.title} />
                    <div className="panel">
                        <form onSubmit={this.merge.bind(this)}>
                            <div className="container">
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="diaBase" value={this.props.diaBase} name="diaBase" required onChange={this.props.handleInputChange} type="number" />
                                        <label htmlFor="diaBase" className={this.props.diaBase !== '' ? 'active' : ''}>Dia Base</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="qtdDiasDuracaoFolha" value={this.props.qtdDiasDuracaoFolha} name="qtdDiasDuracaoFolha" required onChange={this.props.handleInputChange} type="number" />
                                        <label htmlFor="qtdDiasDuracaoFolha" className={this.props.qtdDiasDuracaoFolha !== '' ? 'active' : ''}>Quantidade dias duração folha</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12 m11 l11">
                                    <div className="right-align">
                                        <a className="btn-floating btn-large INFO" style={{marginLeft: '10px' }} title="Adicionar Caderneta" onClick={this.props.addBook} ><i className="material-icons">add</i></a>
                                    </div>
                                </div>
                            </div>

                            {this.props.cadernetas.map((caderneta,i) => (
                              <div key={i} className="container">
                                <div className="row">
                                    <div className="input-field col s12 m11 l11">
                                        <input id={`cadernetas.descricao_${i}`} value={caderneta.descricao} name={`cadernetas.descricao_${i}`}  onChange={this.props.handleInputChange} required type="text" />
                                        <label htmlFor={`cadernetasdescricao_${i}`} className={caderneta.descricao !== '' ? 'active' : ''}>Descrição Caderneta</label>
                                    </div>
                                    <div className="input-field col s12 m1 l1">
                                       <a className="btn-floating btn-small ERROR" style={{positio: 'relative',top:'10px'}} title="Excluir" onClick={this.props.removeBook.bind(this,i)} ><i className="material-icons">delete</i></a>
                                    </div>
                                </div>
                               </div>
                            ))}

                            <PanelFooterDetail customButtons={this.props.customButtons} customResponsiveButtons={this.props.customResponsiveButtons} remove={this.props.showModal} newDetailUrl={URL.NEW_APPOINTMENT_BOOK} submitRef={this.props.submitRef} />
                        </form>
                    </div>
                </div>
                <ModalConfirm text="Confirma a exclusão da caderneta?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
            </div>
        )
    }
}