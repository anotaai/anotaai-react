import React, { Component } from 'react'
import Modal from 'react-modal';
import { customModalStyles } from '../helpers/constants'


export default class ModalConfirm extends Component {

      render() {
            return (
                  <Modal isOpen={this.props.showModalState} style={customModalStyles} contentLabel="Anota ai">

                        <h5 className="center-align">{this.props.title !== undefined ? this.props.title :  "Anota ai"} </h5>

                        <div className="section"></div>

                        <div className={this.props.normalAlign !== undefined ? this.props.normalAlign :  "row center-align"}>{this.props.content}</div>

                        <div className="section"></div>

                        <div className="row center-align">
                              <button onClick={this.props.confirm} className="btn btn-small waves-effect SUCCESS" style={{ marginTop: '10px' }}>{this.props.labelOk !== undefined ? this.props.labelOk :  "Ok"}</button>
                              <button onClick={this.props.hideModal} className="btn btn-small waves-effect WARNING" style={{ marginLeft: '5px', marginTop: '10px' }}>Cancelar</button>
                        </div>
                  </Modal>
            )

      }
}