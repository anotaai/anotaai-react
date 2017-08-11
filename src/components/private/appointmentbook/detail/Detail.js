import React, { Component } from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import ModalConfirm from  '../../../ModalConfirm'
import { URL } from '../../../../helpers/constants'

export default class Detail extends Component {


    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="library_books" label={this.props.title} />
                    <div className="panel">
                        <form onSubmit={this.props.merge.bind(this)}>
                            <PanelFooterDetail customButtons={this.props.customButtons} customResponsiveButtons={this.props.customResponsiveButtons} remove={this.props.showModal} newDetailUrl={URL.NEW_APPOINTMENT_BOOK} submitRef={this.props.submitRef} />
                        </form>
                    </div>
                </div>
                <ModalConfirm text="Confirma a exclusão da caderneta?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
            </div>
        )
    }
}